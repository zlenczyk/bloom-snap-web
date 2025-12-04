import { auth } from "@/auth";
import { EventColor, EventIcon } from "@/lib/data/timelineEventTypes";
import { redirect } from "next/navigation";
import db from "../db";
import { TimelineEvent } from "../schema";

export async function getTimelineEvents(
  plantId: string
): Promise<TimelineEvent[]> {
  const session = await auth();

  if (!session?.user) redirect("/sign-in");

  try {
    const events = await db.timelineEvent.findMany({
      where: { plantId },
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
