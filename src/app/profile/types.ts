import { z } from "zod";

export const AVATAR_PRESETS = [
  "/assets/boy-1.webp",
  "/assets/boy-2.webp",
  "/assets/boy-3.webp",
  "/assets/boy-4.webp",
  "/assets/boy-5.webp",
  "/assets/boy-6.webp",
  "/assets/girl-1.webp",
  "/assets/girl-2.webp",
  "/assets/girl-3.webp",
  "/assets/girl-4.webp",
  "/assets/girl-5.webp",
  "/assets/girl-6.webp",
  "/assets/pet-1.webp",
  "/assets/pet-2.webp",
  "/assets/pet-3.webp",
] as const;

export const AvatarSchema = z.object({
  avatar: z.enum(AVATAR_PRESETS).nullish(),
});

export type AvatarPreset = (typeof AVATAR_PRESETS)[number];
