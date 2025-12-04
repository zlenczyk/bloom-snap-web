"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { EventColorsEnum, EventIcon } from "../data/timelineEventTypes";
import db from "../db/db";
import { TimelineEvent } from "../db/schema";
import { timelineEventSchema } from "../validations/timelineEvent";
import z from "zod";

type Errors = {
  color?: string[];
  date?: string[];
  description?: string[];
  icon?: string[];
  title?: string[];
};

export type CreateTimelineEventState = {
  errors?: Errors;
  event?: TimelineEvent;
  id?: string;
  message?: string;
  success: boolean;
};

const createTimelineEvent = async (
  plantId: string,
  state: CreateTimelineEventState,
  formData: FormData
): Promise<CreateTimelineEventState> => {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  const userId = session.user.id;

  try {
    const plant = await db.plant.findFirst({
      where: {
        id: plantId,
        userId: userId,
      },
    });

    if (!plant) {
      return {
        success: false,
        message:
          "You do not have permission to add a timeline event to this plant",
      };
    }

    const date = formData.get("date");

    const validationResult = timelineEventSchema.safeParse({
      color: formData.get("color"),
      date: date ? new Date(date.toString()) : undefined,
      description: formData.get("description") || undefined,
      icon: formData.get("icon"),
      title: formData.get("title"),
    });

    if (!validationResult.success) {
      console.log(
        "zod flattened errors with field errors:",
        z.flattenError(validationResult.error).fieldErrors
      );

      return {
        errors: z.flattenError(validationResult.error).fieldErrors,
        message: "Input validation failed. Please check your entries.",
        success: false,
      } as const;
    }

    const validData = validationResult.data;

    const event = await db.timelineEvent.create({
      data: {
        color: validData.color,
        date: validData.date,
        description: validData.description,
        icon: validData.icon,
        plantId: plantId,
        title: validData.title,
      },
    });

    const result = {
      ...event,
      color: event.color as EventColorsEnum,
      icon: event.icon as EventIcon,
    };

    revalidatePath(`/my-collection/${plantId}`);

    return {
      success: true,
      message: "Timeline event created successfully",
      event: result,
    };
  } catch (error) {
    console.error("Failed to create timeline event:", error);

    return { success: false, message: "Failed to create timeline event" };
  }
};

export default createTimelineEvent;
