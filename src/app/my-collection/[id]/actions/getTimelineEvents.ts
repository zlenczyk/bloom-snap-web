"use server";

import { auth } from "@/auth";
import {
  EventColor,
  EventIcon,
  TimelineEvent,
} from "@/app/my-collection/[id]/Timeline/types";
import { redirect } from "next/navigation";
import db from "../../../../lib/db";

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
