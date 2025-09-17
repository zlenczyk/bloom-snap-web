import { EventColor, EventIcon } from "../data/timeline-event-types";

export interface TimelineEvent {
  id: string;
  title: string;
  description: string | null;
  date: Date;
  icon: EventIcon;
  color: EventColor;
  createdAt: Date;
  updatedAt: Date;
}
