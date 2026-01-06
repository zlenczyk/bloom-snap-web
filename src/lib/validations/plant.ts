import {
  GrowingMediumEnum,
  LightExposureEnum,
  WindowDirectionEnum,
} from "@/app/my-collection/[id]/PlantDetails/types";
import z from "zod";

export const PlantFormSchema = z.object({
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
  ownedSince: z.date().nullish(),
  isSafe: z.boolean().nullish(),
  isAirPurifying: z.boolean().nullish(),
  description: z
    .string()
    .max(1000, { message: "Description cannot exceed 1000 characters." })
    .nullish(),

  // Environment tab
  currentHeight: z
    .string()
    .max(200, { message: "Current height cannot exceed 200 characters." })
    .nullish(),
  currentPotSize: z
    .string()
    .max(200, { message: "Current pot size cannot exceed 200 characters." })
    .nullish(),
  lastRepotted: z.date().nullish(),
  humidity: z
    .string()
    .max(200, { message: "Humidity cannot exceed 200 characters." })
    .nullish(),
  temperature: z
    .string()
    .max(200, { message: "Temperature cannot exceed 200 characters." })
    .nullish(),
  roomLocation: z
    .string()
    .max(200, { message: "Room location cannot exceed 200 characters." })
    .nullish(),
  windowDirection: z.enum(WindowDirectionEnum).nullish(),
  lightExposure: z.enum(LightExposureEnum).nullish(),
  growingMedium: z.enum(GrowingMediumEnum).nullish(),
  pottingMix: z.array(z.string()).nullish(),

  // Notes tab
  wateringNotes: z
    .string()
    .max(1000, { message: "Watering notes cannot exceed 1000 characters." })
    .nullish(),
  mistingNotes: z
    .string()
    .max(1000, { message: "Misting notes cannot exceed 1000 characters." })
    .nullish(),
  leafCleaningNotes: z
    .string()
    .max(1000, {
      message: "Leaf cleaning notes cannot exceed 1000 characters.",
    })
    .nullish(),
  fertilizingNotes: z
    .string()
    .max(1000, { message: "Fertilizing notes cannot exceed 1000 characters." })
    .nullish(),
  additionalNotes: z
    .string()
    .max(1000, { message: "Additional notes cannot exceed 1000 characters." })
    .nullish(),
  photos: z
    .array(z.union([z.string(), z.instanceof(File)]))
    .max(5)
    .superRefine((items, ctx) => {
      if (!items) return;

      const allowedExtensions = /\.(jpe?g|png|webp|avif|heic|heif)$/i;

      items.forEach((item, index) => {
        // Only validate File objects
        if (item instanceof File) {
          const invalid =
            !item.type.startsWith("image/") ||
            !allowedExtensions.test(item.name);

          if (invalid) {
            ctx.addIssue({
              code: "custom",
              message: `Unsupported format: ${item.name}`,
              path: [index],
            });
          }
        }
      });
    }),
});

export const PlantIdSchema = z.object({
  id: z.string().regex(/^c[a-z0-9]{24,}$/, { message: "Invalid Plant ID" }),
});

export type PlantForm = z.infer<typeof PlantFormSchema>;
