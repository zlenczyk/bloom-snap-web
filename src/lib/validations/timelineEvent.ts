import { z } from "zod";
import { eventIconsTuple, EventColorsEnum } from "../data/timeline-event-types";

export const timelineEventSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .max(250, "Description must be less than 250 characters")
    .optional(),
  date: z
    .date()
    .min(new Date("1900-01-01"), { message: "Date must be after 1900." })
    .max(new Date(), { message: "Date cannot be in the future." }),
  icon: z.enum(eventIconsTuple, {
    error: () => ({ message: "Icon is required" }),
  }),
  color: z.enum(EventColorsEnum, {
    error: () => ({ message: "Color is required" }),
  }),
});

export const timelineEventIdSchema = z.object({
  id: z.string().min(1, "Timeline Event ID is required"),
});

export type TimelineEventFormData = z.infer<typeof timelineEventSchema>;
export type TimelineEventIdData = z.infer<typeof timelineEventIdSchema>;
