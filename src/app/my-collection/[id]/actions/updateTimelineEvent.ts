"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";
import { EventColorsEnum, EventIcon, TimelineEvent } from "../Timeline/types";
import db from "../../../../lib/db";
import { timelineEventSchema } from "../../../../lib/validations/timelineEvent";

type Errors = {
  color?: string[];
  date?: string[];
  description?: string[];
  icon?: string[];
  title?: string[];
};

export type UpdateTimelineEventState = {
  errors?: Errors;
  event?: TimelineEvent;
  message: string;
  success: boolean;
};

const updateTimelineEvent = async (
  plantId: string,
  eventId: string,
  prevState: UpdateTimelineEventState,
  formData: FormData
): Promise<UpdateTimelineEventState> => {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  try {
    const date = formData.get("date");

    const validationResult = timelineEventSchema.safeParse({
      title: formData.get("title"),
      description: formData.get("description") || undefined,
      date: date ? new Date(date.toString()) : undefined,
      icon: formData.get("icon"),
      color: formData.get("color"),
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

    const event = await db.timelineEvent.update({
      where: { plantId: plantId, id: eventId },
      data: {
        title: validData.title,
        description: validData.description,
        date: validData.date,
        icon: validData.icon,
        color: validData.color,
      },
    });

    const result = {
      ...event,
      icon: event.icon as EventIcon,
      color: event.color as EventColorsEnum,
    };

    revalidatePath(`/my-collection/${plantId}`);

    return {
      success: true,
      message: "Event updated successfully",
      event: result,
    };
  } catch (error) {
    console.error("Update event error:", error);
    return { success: false, message: "Failed to update event" };
  }
};

export default updateTimelineEvent;
