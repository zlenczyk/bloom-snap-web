import { EventColorsEnum, EventIcon } from "@/lib/data/timeline-event-types";
import db from "../db";
import { TimelineEvent } from "../schema";

export async function createTimelineEvent(data: {
  title: string;
  description?: string;
  date: Date;
  icon: string;
  color: string;
}): Promise<{ success: boolean; event?: TimelineEvent; error?: string }> {
  try {
    const { title, description, date, icon, color } = data;

    const event = await db.timelineEvent.create({
      data: { title, description, date, icon, color },
    });

    return {
      success: true,
      event: {
        ...event,
        icon: icon as EventIcon,
        color: color as EventColorsEnum,
      },
    };
  } catch (error) {
    console.error("Failed to create timeline event:", error);
    return { success: false, error: "Failed to create timeline event" };
  }
}
