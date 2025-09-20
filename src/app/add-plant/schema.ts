import { GrowingMedium } from "@/lib/data/growing-medium";
import { LightExposure } from "@/lib/data/light-exposure";
import { WindowDirection } from "@/lib/data/window-direction";
import z from "zod";

const stringOrNull = z.string().nullable();

const dateOrNull = z
  .date()
  .min(new Date("1900-01-01"))
  .max(new Date())
  .nullable();

const booleanStringOrNull = z.enum(["true", "false", "null"]);

export const AddPlantFormInputSchema = z.object({
  commonName: z.string().min(1, { message: "Common name is required." }),
  species: stringOrNull.optional(),
  genus: stringOrNull.optional(),
  nickname: stringOrNull.optional(),
  description: stringOrNull.optional(),
  source: stringOrNull.optional(),
  ownedSince: dateOrNull.optional(),
  lastRepotted: dateOrNull.optional(),
  roomLocation: stringOrNull.optional(),
  isPetSafe: booleanStringOrNull.optional(),
  isHealthy: booleanStringOrNull.optional(),
  windowDirection: z.enum(WindowDirection).nullable().optional(),
  lightExposure: z.enum(LightExposure).nullable().optional(),
  isAirCleaning: booleanStringOrNull.optional(),
  growingMedium: z.enum(GrowingMedium).nullable().optional(),
  pottingMix: z.array(z.string()).nullable().optional(),
});
