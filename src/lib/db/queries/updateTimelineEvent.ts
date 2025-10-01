import { EventColorsEnum, EventIcon } from "@/lib/data/timelineEventTypes";
import db from "../db";
import { TimelineEvent } from "../schema";

export async function updateTimelineEvent(
  id: string,
  data: {
    title: string;
    description?: string;
    date: Date;
    icon: string;
    color: string;
  }
): Promise<{ success: boolean; error?: string; event?: TimelineEvent }> {
  try {
    const event = await db.timelineEvent.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        date: data.date,
        icon: data.icon,
        color: data.color,
      },
    });
    return {
      success: true,
      event: {
        ...event,
        icon: event.icon as EventIcon,
        color: event.color as EventColorsEnum,
      },
    };
  } catch (error) {
    console.error("Failed to update timeline event:", error);
    return { success: false, error: "Failed to update timeline event" };
  }
}
