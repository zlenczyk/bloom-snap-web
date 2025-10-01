import { EventColor, EventIcon } from "@/lib/data/timelineEventTypes";
import db from "../db";
import { TimelineEvent } from "../schema";

export async function getTimelineEvents(): Promise<TimelineEvent[]> {
  try {
    const events = await db.timelineEvent.findMany({
      orderBy: {
        date: "desc",
      },
    });

    return events.map((event) => ({
      ...event,
      icon: event.icon as EventIcon,
      color: event.color as EventColor,
    }));
  } catch (error) {
    console.error("Failed to fetch timeline events:", error);
    return [];
  }
}
