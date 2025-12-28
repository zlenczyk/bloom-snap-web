import { z } from "zod";
import {
  eventIconsTuple,
  EventColorsEnum,
} from "../../app/my-collection/[id]/Timeline/types";

export const timelineEventSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional(),
  date: z.date(),
  icon: z.enum(eventIconsTuple, {
    error: () => ({ message: "Icon is required" }),
  }),
  color: z.enum(EventColorsEnum, {
    error: () => ({ message: "Color is required" }),
  }),
});

export const timelineEventIdSchema = z.object({
  id: z.cuid({
    message: "Timeline Event ID must be a valid CUID",
  }),
});

export type TimelineEventFormData = z.infer<typeof timelineEventSchema>;
export type TimelineEventIdData = z.infer<typeof timelineEventIdSchema>;
