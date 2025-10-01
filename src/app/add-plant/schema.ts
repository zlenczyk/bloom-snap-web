import {
  GrowingMediumEnum,
  LightExposureEnum,
  WindowDirectionEnum,
} from "@/lib/data/plantDetailsTypes";
import z from "zod";

const dateOrNull = z.date().min(new Date("1900-01-01")).max(new Date());

export const AddPlantFormSchema = z.object({
  // Overview tab
  commonName: z
    .string()
    .min(1, { message: "Common name is required." })
    .max(200, { message: "Common name cannot exceed 200 characters." }),
  species: z
    .string()
    .max(200, { message: "Species cannot exceed 200 characters." })
    .optional(),
  genus: z
    .string()
    .max(200, { message: "Genus cannot exceed 200 characters." })
    .optional(),
  nickname: z
    .string()
    .max(200, { message: "Nickname cannot exceed 200 characters." })
    .optional(),
  source: z
    .string()
    .max(200, { message: "Source cannot exceed 200 characters." })
    .optional(),
  ownedSince: dateOrNull.optional(),
  isSafe: z.boolean().optional(),
  isAirPurifying: z.boolean().optional(),
  description: z
    .string()
    .max(300, { message: "Description cannot exceed 300 characters." })
    .optional(),

  // Environment tab
  currentHeight: z
    .string()
    .max(50, { message: "Current height cannot exceed 50 characters." })
    .optional(),
  currentPotSize: z
    .string()
    .max(50, { message: "Current pot size cannot exceed 50 characters." })
    .optional(),
  lastRepotted: dateOrNull.optional(),
  humidity: z
    .string()
    .max(50, { message: "Humidity cannot exceed 50 characters." })
    .optional(),
  temperature: z
    .string()
    .max(50, { message: "Temperature cannot exceed 50 characters." })
    .optional(),
  roomLocation: z.string().optional(),
  windowDirection: z.enum(WindowDirectionEnum).optional(),
  lightExposure: z.enum(LightExposureEnum).optional(),
  growingMedium: z.enum(GrowingMediumEnum).optional(),
  pottingMix: z.array(z.string()).nullable().optional(),

  // Notes tab
  wateringNotes: z
    .string()
    .max(300, { message: "Watering notes cannot exceed 300 characters." })
    .optional(),
  mistingNotes: z
    .string()
    .max(300, { message: "Misting notes cannot exceed 300 characters." })
    .optional(),
  leafCleaningNotes: z
    .string()
    .max(300, { message: "Leaf cleaning notes cannot exceed 300 characters." })
    .optional(),
  fertilizingNotes: z
    .string()
    .max(300, { message: "Fertilizing notes cannot exceed 300 characters." })
    .optional(),
  additionalNotes: z
    .string()
    .max(300, { message: "Additional notes cannot exceed 300 characters." })
    .optional(),
});

export type AddPlantForm = z.infer<typeof AddPlantFormSchema>;
