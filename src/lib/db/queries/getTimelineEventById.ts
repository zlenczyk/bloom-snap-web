import { EventColor, EventIcon } from "@/lib/data/timelineEventTypes";
import db from "../db";
import { TimelineEvent } from "../schema";

export async function getTimelineEventById(
  id: string
): Promise<TimelineEvent | null> {
  try {
    const event = await db.timelineEvent.findUnique({
      where: { id },
    });

    return event
      ? {
          ...event,
          icon: event.icon as EventIcon,
          color: event.color as EventColor,
        }
      : null;
  } catch (error) {
    console.error("Failed to fetch plant event:", error);
    return null;
  }
}
