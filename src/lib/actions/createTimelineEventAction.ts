"use server";

import { revalidatePath } from "next/cache";
import { createTimelineEvent } from "../db/queries/createTimelineEvent";
import { TimelineEvent } from "../db/schema";
import { timelineEventSchema } from "../validations/timelineEvent";

type Errors = {
  title?: string[];
  description?: string[];
  date?: string[];
  icon?: string[];
  color?: string[];
};

export type CreateTimelineEventState = {
  errors?: Errors;
  event?: TimelineEvent;
  id?: string;
  message?: string;
  success: boolean;
};

const createTimelineEventAction = async (
  state: CreateTimelineEventState,
  formData: FormData
): Promise<CreateTimelineEventState> => {
  try {
    const date = formData.get("date");

    const validatedData = timelineEventSchema.parse({
      title: formData.get("title"),
      description: formData.get("description") || undefined,
      date: date ? new Date(date.toString()) : undefined,
      icon: formData.get("icon"),
      color: formData.get("color"),
    });

    const result = await createTimelineEvent(validatedData);

    if (!result.success) {
      return {
        success: false,
        message: result.error || "Failed to create event",
      };
    }

    revalidatePath("/");

    return {
      success: true,
      message: "Event created successfully",
      event: result?.event,
    };
  } catch (error) {
    console.error("Create event error:", error);
    return { success: false, message: "Failed to create event" };
  }
};

export default createTimelineEventAction;
