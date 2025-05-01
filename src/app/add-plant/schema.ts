import { boolean, z } from "zod";

const fileSchema = z.object({
  name: z.string(),
  size: z.number().max(5 * 1024 * 1024, "File size should not exceed 5MB"), // Max size 5MB
  type: z.enum(["image/jpeg", "image/png", "application/pdf"]),
});

// const AddPlantFormSchema = z
//   .object({
//     species: z
//       .string()
//       .min(2, { message: "Species must have at least 2 characters." })
//       .max(100, { message: "Species too long. Use up to 100 characters." })
//       .optional(),

//     genus: z
//       .string()
//       .min(2, { message: "Genus must have at least 2 characters." })
//       .max(100, { message: "Genus too long. Use up to 100 characters." })
//       .optional(),

//     commonName: z
//       .string()
//       .min(2, { message: "Common name must have at least 2 characters." })
//       .max(100, { message: "Common name too long. Use up to 100 characters." })
//       .optional(),

//     nickname: z
//       .string()
//       .min(2, { message: "Nickname must have at least 2 characters." })
//       .max(100, { message: "Nickname too long. Use up to 100 characters." })
//       .optional(),

//     description: z
//       .string()
//       .min(2, {
//         message: "Custom description must have at least 2 characters.",
//       })
//       .max(250, {
//         message: "Custom description too long. Use up to 250 characters.",
//       })
//       .optional(),

//     source: z
//       .string()
//       .min(2, { message: "Source must have at least 2 characters." })
//       .max(100, { message: "Source too long. Use up to 100 characters." })
//       .optional(),

//     date: z
//       .date()
//       .min(new Date("1900-01-01"), { message: "Date must be after 1900" })
//       .max(new Date(), { message: "Date cannot be in the future" })
//       .optional(),

//     lastRepotted: z
//       .date()
//       .min(new Date("1900-01-01"), { message: "Date must be after 1900" })
//       .max(new Date(), { message: "Date cannot be in the future" })
//       .optional(),

//     roomLocation: z
//       .string()
//       .min(2, { message: "Room name must have at least 2 characters." })
//       .max(50, { message: "Room name too long. Use up to 50 characters." })
//       .optional(),

//     isPetSafe: z
//       .enum(["yes", "no"], {
//         message: "Select whether the plant is safe for pets.",
//       })
//       .optional(),

//     isHealthy: z
//       .string()
//       .min(2, { message: "Health status must have at least 2 characters." })
//       .max(300, {
//         message: "Health status too long. Use up to 300 characters.",
//       })
//       .optional(),

//     windowDirection: z
//       .enum(
//         [
//           "north",
//           "south",
//           "east",
//           "west",
//           "northeast",
//           "northwest",
//           "southeast",
//           "southwest",
//           "artificial",
//         ],
//         { message: "Select a valid window direction." }
//       )
//       .optional(),

//     isBlooming: z
//       .enum(["yes", "no"], {
//         message: "Select whether the plant is blooming.",
//       })
//       .optional(),

//     isAirCleaning: z
//       .enum(["yes", "no"], {
//         message: "Select whether the plant is an air cleaner.",
//       })
//       .optional(),

//     pictures: z
//       .array(fileSchema)
//       .max(5, "You can upload up to 5 pictures")
//       .optional(),
//   })
//   .refine(
//     (data) => {
//       return data.species || data.genus || data.commonName || data.nickname;
//     },
//     {
//       message:
//         "At least one of species, genus, common name, or nickname is required",
//       path: ["species", "genus", "commonName", "nickname"], // Show error for these fields
//     }
//   );

// const AddPlantFormSchema = z
//   .object({
//     species: z.preprocess(
//       (val) => (val === "" ? null : val),
//       z.string().min(2).max(100).nullable()
//     ),
//     genus: z.preprocess(
//       (val) => (val === "" ? null : val),
//       z.string().min(2).max(100).nullable()
//     ),
//     commonName: z.preprocess(
//       (val) => (val === "" ? null : val),
//       z.string().min(2).max(100).nullable()
//     ),
//     nickname: z.preprocess(
//       (val) => (val === "" ? null : val),
//       z.string().min(2).max(100).nullable()
//     ),
//     description: z.preprocess(
//       (val) => (val === "" ? null : val),
//       z.string().min(2).max(250).nullable()
//     ),
//     source: z.preprocess(
//       (val) => (val === "" ? null : val),
//       z.string().min(2).max(100).nullable()
//     ),
//     ownedSince: z.preprocess(
//       (val) => (val === "" ? null : val),
//       z.date().min(new Date("1900-01-01")).max(new Date()).nullable()
//     ),
//     lastRepotted: z.preprocess(
//       (val) => (val === "" ? null : val),
//       z.date().min(new Date("1900-01-01")).max(new Date()).nullable()
//     ),
//     roomLocation: z.preprocess(
//       (val) => (val === "" ? null : val),
//       z.string().min(2).max(50).nullable()
//     ),

//     isPetSafe: z.preprocess(
//       (val) =>
//         val === "true"
//           ? true
//           : val === "false"
//           ? false
//           : val === ""
//           ? null
//           : val,
//       z.enum(["true", "false", ""]).nullable()
//     ),

//     isHealthy: z.preprocess(
//       (val) => (val === "" ? null : val),
//       z.string().min(2).max(300).nullable()
//     ),
//     windowDirection: z.preprocess(
//       (val) => (val === "" ? null : val),
//       z
//         .enum([
//           "",
//           "north",
//           "south",
//           "east",
//           "west",
//           "northeast",
//           "northwest",
//           "southeast",
//           "southwest",
//           "artificial",
//         ])
//         .nullable()
//     ),
//     isBlooming: z.preprocess(
//       (val) =>
//         val === "true"
//           ? true
//           : val === "false"
//           ? false
//           : val === ""
//           ? null
//           : val,
//       z.enum(["true", "false", ""]).nullable()
//     ),

//     isAirCleaning: z.preprocess(
//       (val) =>
//         val === "true"
//           ? true
//           : val === "false"
//           ? false
//           : val === ""
//           ? null
//           : val,
//       z.enum(["true", "false", ""]).nullable()
//     ),
//   })
//   .refine(
//     (data) => {
//       return (
//         data.species ||
//         data.genus ||
//         data.commonName ||
//         data.nickname ||
//         data.description ||
//         data.source
//       );
//     },
//     {
//       message:
//         "At least one of species, genus, common name, or nickname is required",
//       path: ["species", "genus", "commonName", "nickname"], // Show error for these fields
//     }
//   );

const AddPlantFormSchema = z.object({
  commonName: z
    .string()
    .max(100, { message: "Common name too long. Use up to 100 characters." }),

  species: z
    .string()
    .max(100, { message: "Species too long. Use up to 100 characters." })
    .or(z.literal(""))
    .optional(),

  genus: z
    .string()
    .max(100, { message: "Genus too long. Use up to 100 characters." })
    .or(z.literal(""))
    .optional(),

  nickname: z
    .string()
    .max(100, { message: "Nickname too long. Use up to 100 characters." })
    .or(z.literal(""))
    .optional(),

  description: z
    .string()
    .max(250, {
      message: "Custom description too long. Use up to 250 characters.",
    })
    .or(z.literal(""))
    .optional(),

  source: z
    .string()
    .max(100, { message: "Source too long. Use up to 100 characters." })
    .or(z.literal(""))
    .optional(),

  ownedSince: z.coerce
    .date()
    .min(new Date("1900-01-01"), { message: "Date must be after 1900" })
    .max(new Date(), { message: "Date cannot be in the future" })
    .optional(),

  lastRepotted: z.coerce
    .date()
    .min(new Date("1900-01-01"), { message: "Date must be after 1900" })
    .max(new Date(), { message: "Date cannot be in the future" })
    .optional(),

  roomLocation: z
    .string()
    .max(50, { message: "Room name too long. Use up to 50 characters." })
    .or(z.literal(""))
    .optional(),

  isPetSafe: z.enum(["true", "false", "null"]),

  isHealthy: z.preprocess((val) => {
    if (val === "true") return true;
    if (val === "false") return false;
    if (val === "null") return null;
    return val;
  }, z.boolean().nullable()),

  windowDirection: z
    .enum(
      [
        "null",
        "north",
        "south",
        "east",
        "west",
        "northeast",
        "northwest",
        "southeast",
        "southwest",
        "artificial",
      ],
      { message: "Select a valid window direction." }
    )
    .optional(),

  isBlooming: z.enum(["true", "false", "null"]),

  isAirCleaning: z.enum(["true", "false", "null"]),

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
