import { z } from "zod";

const fileSchema = z.object({
  name: z.string(),
  size: z.number().max(5 * 1024 * 1024, "File size should not exceed 5MB"), // Max size 5MB
  type: z.enum(["image/jpeg", "image/png", "application/pdf"]),
});

const AddPlantFormSchema = z.object({
  commonName: z
    .string()
    .min(1, { message: "Common name is required." })
    .max(100, { message: "Common name too long. Use up to 100 characters." }),

  species: z
    .preprocess(
      (value) => (value === "" ? null : value),
      z
        .string()
        .max(100, { message: "Species too long. Use up to 100 characters." })
        .nullable()
    )
    .optional(),

  genus: z
    .preprocess(
      (value) => (value === "" ? null : value),
      z
        .string()
        .max(100, { message: "Genus too long. Use up to 100 characters." })
        .nullable()
    )
    .optional(),

  nickname: z
    .preprocess(
      (value) => (value === "" ? null : value),
      z
        .string()
        .max(100, { message: "Nickname too long. Use up to 100 characters." })
        .nullable()
    )
    .optional(),

  description: z
    .preprocess(
      (value) => (value === "" ? null : value),
      z
        .string()
        .max(250, {
          message: "Custom description too long. Use up to 250 characters.",
        })
        .nullable()
    )
    .optional(),

  source: z
    .preprocess(
      (value) => (value === "" ? null : value),
      z
        .string()
        .max(100, { message: "Source too long. Use up to 100 characters." })
        .nullable()
    )
    .optional(),

  ownedSince: z.coerce
    .date()
    .min(new Date("1900-01-01"), { message: "Date must be after 1900." })
    .max(new Date(), { message: "Date cannot be in the future." })
    .optional()
    .nullable(),

  lastRepotted: z.coerce
    .date()
    .min(new Date("1900-01-01"), { message: "Date must be after 1900." })
    .max(new Date(), { message: "Date cannot be in the future." })
    .optional()
    .nullable(),

  roomLocation: z
    .preprocess(
      (value) => (value === "" ? null : value),
      z
        .string()
        .max(100, { message: "Room name too long. Use up to 100 characters." })
        .nullable()
    )
    .optional(),

  isPetSafe: z
    .preprocess((value) => {
      if (value === "true") return true;
      if (value === "false") return false;
      if (value === "null" || value === "") return null;
      return value;
    }, z.boolean().nullable())
    .optional(),

  isHealthy: z
    .preprocess((value) => {
      if (value === "true") return true;
      if (value === "false") return false;
      if (value === "null" || value === "") return null;
      return value;
    }, z.boolean().nullable())
    .optional(),

  windowDirection: z
    .preprocess(
      (value) => {
        if (value === "null" || value === "") {
          return null;
        }
        return value;
      },
      z
        .enum([
          "north-facing-northern-hemisphere", // North-facing (no direct sun in Northern Hemisphere)
          "south-facing-northern-hemisphere", // South-facing (full day of sun in Northern Hemisphere)
          "east-facing-northern-hemisphere", // East-facing (morning sun, partial shade, good for plants)
          "west-facing-northern-hemisphere", // West-facing (afternoon sun, tends to be harsher)

          "north-facing-southern-hemisphere", // North-facing (full day of sun in Southern Hemisphere)
          "south-facing-southern-hemisphere", // South-facing (no direct sun in Southern Hemisphere)
          "east-facing-southern-hemisphere", // East-facing (morning sun, partial shade, good for plants)
          "west-facing-southern-hemisphere", // West-facing (afternoon sun, tends to be harsher)
        ])
        .nullable()
    )
    .optional(),

  lightExposure: z
    .preprocess(
      (value) => {
        if (value === "null" || value === "") return null;
        return value;
      },
      z
        .enum([
          "morning-sun-light", // gentle light in the morning (usually east-facing)
          "afternoon-sun-light", // stronger light in the afternoon (usually west-facing)
          "full-day-sun-light", // full direct sunlight throughout the day (usually south-facing in the Northern Hemisphere)
          "low-sun-light", // low amount of natural sunlight (often north-facing)
          "indirect-sun-light", // diffused or reflected light, not directly hitting the plant
          "artificial-light", // no natural light, only from bulbs or grow lights
        ])
        .nullable()
    )
    .optional(),

  isBlooming: z
    .preprocess((value) => {
      if (value === "true") return true;
      if (value === "false") return false;
      if (value === "null" || value === "") return null;
      return value;
    }, z.boolean().nullable())
    .optional(),

  isAirCleaning: z
    .preprocess((value) => {
      if (value === "true") return true;
      if (value === "false") return false;
      if (value === "null" || value === "") return null;
      return value;
    }, z.boolean().nullable())
    .optional(),

  growingMedium: z
    .preprocess((value) => {
      if (value === "null" || value === "") return null;
      return value;
    }, z.enum(["soil", "semi-hydroponics", "hydroponics"]).nullable())
    .optional(),

  pottingMix: z.preprocess((value) => {
    if (!Array.isArray(value)) {
      return null;
    }

    if (value.length === 0) {
      return null;
    }

    return value;
  }, z.union([z.array(z.string()), z.null()])),

  // pictures: z
  //   .array(fileSchema)
  //   .max(5, "You can upload up to 5 pictures")
  //   .optional()
  //   .nullable(),
});
// .refine(
//   (data) => {
//     return (
//       data.species ||
//       data.genus ||
//       data.commonName ||
//       data.nickname ||
//       data.description ||
//       data.source
//     );
//   },
//   {
//     message:
//       "At least one of species, genus, common name, or nickname is required",
//     path: ["species", "genus", "commonName", "nickname"], // Show error for these fields
//   }
// );

export default AddPlantFormSchema;
