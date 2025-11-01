import {
  GrowingMediumEnum,
  LightExposureEnum,
  WindowDirectionEnum,
} from "@/lib/data/plantDetailsTypes";
import z from "zod";

const pastDate = z.date().min(new Date("1900-01-01")).max(new Date());

export const AddPlantFormSchema = z.object({
  // Overview tab
  commonName: z
    .string()
    .min(1, { message: "Common name is required." })
    .max(200, { message: "Common name cannot exceed 200 characters." }),
  species: z
    .string()
    .max(200, { message: "Species cannot exceed 200 characters." })
    .nullish(),
  genus: z
    .string()
    .max(200, { message: "Genus cannot exceed 200 characters." })
    .nullish(),
  nickname: z
    .string()
    .max(200, { message: "Nickname cannot exceed 200 characters." })
    .nullish(),
  source: z
    .string()
    .max(200, { message: "Source cannot exceed 200 characters." })
    .nullish(),
  ownedSince: pastDate.nullish(),
  isSafe: z.boolean().nullish(),
  isAirPurifying: z.boolean().nullish(),
  description: z
    .string()
    .max(300, { message: "Description cannot exceed 300 characters." })
    .nullish(),

  // Environment tab
  currentHeight: z
    .string()
    .max(50, { message: "Current height cannot exceed 50 characters." })
    .nullish(),
  currentPotSize: z
    .string()
    .max(50, { message: "Current pot size cannot exceed 50 characters." })
    .nullish(),
  lastRepotted: pastDate.nullish(),
  humidity: z
    .string()
    .max(50, { message: "Humidity cannot exceed 50 characters." })
    .nullish(),
  temperature: z
    .string()
    .max(50, { message: "Temperature cannot exceed 50 characters." })
    .nullish(),
  roomLocation: z.string().nullish(),
  windowDirection: z.enum(WindowDirectionEnum).nullish(),
  lightExposure: z.enum(LightExposureEnum).nullish(),
  growingMedium: z.enum(GrowingMediumEnum).nullish(),
  pottingMix: z.array(z.string()).nullish(),

  // Notes tab
  wateringNotes: z
    .string()
    .max(300, { message: "Watering notes cannot exceed 300 characters." })
    .nullish(),
  mistingNotes: z
    .string()
    .max(300, { message: "Misting notes cannot exceed 300 characters." })
    .nullish(),
  leafCleaningNotes: z
    .string()
    .max(300, { message: "Leaf cleaning notes cannot exceed 300 characters." })
    .nullish(),
  fertilizingNotes: z
    .string()
    .max(300, { message: "Fertilizing notes cannot exceed 300 characters." })
    .nullish(),
  additionalNotes: z
    .string()
    .max(300, { message: "Additional notes cannot exceed 300 characters." })
    .nullish(),
});

export type AddPlantForm = z.infer<typeof AddPlantFormSchema>;
