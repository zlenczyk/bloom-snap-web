"use server";

import { auth } from "@/auth";
import db from "@/lib/db/db";
import { AddPlantFormSchema } from "./schema";

type Errors = {
  commonName?: string[];
  species?: string[];
  genus?: string[];
  nickname?: string[];
  currentHeight?: string[];
  currentPotSize?: string[];
  wateringNotes?: string[];
  mistingNotes?: string[];
  leafCleaningNotes?: string[];
  fertilizingNotes?: string[];
  additionalNotes?: string[];
  humidity?: string[];
  temperature?: string[];
  description?: string[];
  source?: string[];
  ownedSince?: string[];
  lastRepotted?: string[];
  roomLocation?: string[];
  isSafe?: string[];
  isAirPurifying?: string[];
  windowDirection?: string[];
  lightExposure?: string[];
  growingMedium?: string[];
  pottingMix?: string[];
};

export type AddPlantFormState = {
  message?: string;
  success?: boolean;
  errors?: Errors;
};

const toOptionalBoolean = (value: unknown): boolean | null => {
  if (value === "true") return true;
  if (value === "false") return false;
  return null;
};

const addPlant = async (state: AddPlantFormState, formData: FormData) => {
  const session = await auth()

  if (!session?.user) return null
  
  const userId = session?.user?.id;

  try {
    const ownedSinceStr = formData.get("ownedSince");
    const lastRepottedStr = formData.get("lastRepotted");

    console.log("xdddd: ", formData.get("lastRepotted"));

    for (const [key, value] of formData.entries()) {
      console.log(key + ": " + value);
    }

    const validationResult = AddPlantFormSchema.safeParse({
      species: formData.get("species") || null,
      genus: formData.get("genus") || null,
      commonName: formData.get("commonName") || null,
      nickname: formData.get("nickname") || null,
      description: formData.get("description") || null,
      source: formData.get("source") || null,
      ownedSince: ownedSinceStr ? new Date(ownedSinceStr.toString()) : null,
      lastRepotted: lastRepottedStr
        ? new Date(lastRepottedStr.toString())
        : null,
      roomLocation: formData.get("roomLocation") || null,
      isSafe: toOptionalBoolean(formData.get("isSafe")),
      windowDirection: formData.get("windowDirection") || null,
      isAirPurifying: toOptionalBoolean(formData.get("isAirPurifying")),
    });

    console.log("WTF all data: ", validationResult.data);

    if (!validationResult.success) {
      console.log(
        "emmmmmm: ",
        JSON.stringify(validationResult.error.flatten().fieldErrors)
      );
      return {
        errors: validationResult.error.flatten().fieldErrors,
        message: "Input validation failed. Please check your entries.",
        success: false,
      } as const;
    }

    const validData = validationResult.data;

    const created = await db.plant.create({
      data: {
        userId,
        commonName: validData.commonName,
        species: validData.species,
        genus: validData.genus,
        nickname: validData.nickname,
        source: validData.source,
        ownedSince: validData.ownedSince,
        isSafe: validData.isSafe ?? undefined,
        isAirPurifying: validData.isAirPurifying ?? undefined,
        description: validData.description,
        currentHeight: validData.currentHeight,
        currentPotSize: validData.currentPotSize,
        lastRepotted: validData.lastRepotted,
        humidity: validData.humidity,
        temperature: validData.temperature,
        roomLocation: validData.roomLocation,
        windowDirection: validData.windowDirection || undefined,
        lightExposure: validData.lightExposure || undefined,
        growingMedium: validData.growingMedium || undefined,
        pottingMix: validData.pottingMix ?? undefined,
        wateringNotes: validData.wateringNotes,
        mistingNotes: validData.mistingNotes,
        leafCleaningNotes: validData.leafCleaningNotes,
        fertilizingNotes: validData.fertilizingNotes,
        additionalNotes: validData.additionalNotes,
      },
    });

    return {
      success: true,
      message: "Form submitted successfully.",
    };
  } catch (error) {
    console.error("Database error:", error);
    return {
      message: "Failed to submit form. Please try again later.",
      success: false,
    };
  }
};

export default addPlant;
