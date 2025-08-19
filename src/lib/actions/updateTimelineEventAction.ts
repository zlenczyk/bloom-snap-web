"use server";

import { revalidatePath } from "next/cache";
import { updateTimelineEvent } from "../db/queries/updateTimelineEvent";
import { TimelineEvent } from "../db/schema";
import {
  timelineEventIdSchema,
  timelineEventSchema,
} from "../validations/timelineEvent";

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
  message?: string;
  success: boolean;
};

export async function updateTimelineEventAction(
  id: string,
  prevState: UpdateTimelineEventState,
  formData: FormData
): Promise<UpdateTimelineEventState> {
  try {
    const validatedId = timelineEventIdSchema.parse({ id });

    const date = formData.get("date");

    const validatedData = timelineEventSchema.parse({
      title: formData.get("title"),
      description: formData.get("description") || undefined,
      date: date ? new Date(date.toString()) : undefined,
      icon: formData.get("icon"),
      color: formData.get("color"),
    });

    const result = await updateTimelineEvent(validatedId.id, validatedData);

    if (!result.success) {
      return {
        success: false,
        message: result.error || "Failed to update event",
      };
    }

    revalidatePath("/");

    return {
      success: true,
      message: "Event updated successfully",
      event: result?.event,
    };
  } catch (error) {
    console.error("Update event error:", error);
    return { success: false, message: "Failed to update event" };
  }
}
