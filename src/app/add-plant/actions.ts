"use server";

import { auth } from "@/auth";
import db from "@/lib/db/db";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";
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
  photos?: string[];
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

const handleUpload = async (
  file: File,
  userId: string
): Promise<string | null> => {
  const path = `${userId}/${crypto.randomUUID()}-${file.name}`;

  const { data, error } = await supabaseAdmin.storage
    .from("bloomsnap-plant-photos")
    .upload(path, file, { upsert: false });

  if (error) {
    console.error("Supabase upload error:", error);

    return null;
  }

  return path;
};

const addPlant = async (state: AddPlantFormState, formData: FormData) => {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  const userId = session.user.id;

  const ownedSinceStr = formData.get("ownedSince");
  const lastRepottedStr = formData.get("lastRepotted");

  const pottingMixValues = (formData.getAll("pottingMix") as string[])
    .map((v) => v.trim())
    .filter((v) => v !== "");

  const validationResult = AddPlantFormSchema.safeParse({
    additionalNotes: formData.get("additionalNotes") || null,
    currentHeight: formData.get("currentHeight") || null,
    currentPotSize: formData.get("currentPotSize") || null,
    fertilizingNotes: formData.get("fertilizingNotes") || null,
    growingMedium: formData.get("growingMedium") || null,
    species: formData.get("species") || null,
    genus: formData.get("genus") || null,
    humidity: formData.get("humidity") || null,
    leafCleaningNotes: formData.get("leafCleaningNotes") || null,
    lightExposure: formData.get("lightExposure") || null,
    mistingNotes: formData.get("mistingNotes") || null,
    pottingMix: pottingMixValues,
    temperature: formData.get("temperature") || null,
    wateringNotes: formData.get("wateringNotes") || null,
    commonName: formData.get("commonName") || "",
    nickname: formData.get("nickname") || null,
    description: formData.get("description") || null,
    source: formData.get("source") || null,
    ownedSince: ownedSinceStr ? new Date(ownedSinceStr.toString()) : null,
    lastRepotted: lastRepottedStr ? new Date(lastRepottedStr.toString()) : null,
    roomLocation: formData.get("roomLocation") || null,
    isSafe: toOptionalBoolean(formData.get("isSafe")),
    windowDirection: formData.get("windowDirection") || null,
    isAirPurifying: toOptionalBoolean(formData.get("isAirPurifying")),
    photos: (formData.getAll("photos") as File[]).slice(0, 5) || [],
  });

  console.log("Validation result:", validationResult);

  if (!validationResult.success) {
    console.log(
      "zod flattened errors with field errors:",
      z.flattenError(validationResult.error).fieldErrors
    );

    return {
      errors: z.flattenError(validationResult.error).fieldErrors,
      message: "Input validation failed. Please check your entries.",
      success: false,
    } as const;
  }

  const validData = validationResult.data;

  let newPlantId: string;

  try {
    const newPlant = await db.plant.create({
      data: {
        additionalNotes: validData.additionalNotes,
        commonName: validData.commonName,
        currentHeight: validData.currentHeight,
        currentPotSize: validData.currentPotSize,
        description: validData.description,
        fertilizingNotes: validData.fertilizingNotes,
        genus: validData.genus,
        growingMedium: validData.growingMedium || undefined,
        humidity: validData.humidity,
        isAirPurifying: validData.isAirPurifying ?? undefined,
        isSafe: validData.isSafe ?? undefined,
        lastRepotted: validData.lastRepotted,
        leafCleaningNotes: validData.leafCleaningNotes,
        lightExposure: validData.lightExposure || undefined,
        mistingNotes: validData.mistingNotes,
        nickname: validData.nickname,
        ownedSince: validData.ownedSince,
        pottingMix: validData.pottingMix || [],
        roomLocation: validData.roomLocation,
        source: validData.source,
        species: validData.species,
        temperature: validData.temperature,
        userId,
        wateringNotes: validData.wateringNotes,
        windowDirection: validData.windowDirection || undefined,
      },
    });

    newPlantId = newPlant.id;
  } catch (error) {
    console.error("Database error:", error);
    return {
      message: "Failed to submit form. Please try again later.",
      success: false,
    };
  }

  const uploadedPhotoPaths: string[] = [];
  const failedPhotos: string[] = []; // both for not uploaded and not saved to db

  for (const file of validData.photos || []) {
    const path = await handleUpload(file, userId);

    if (!path) {
      failedPhotos.push(file.name);
    } else {
      uploadedPhotoPaths.push(path);
    }
  }

  if (uploadedPhotoPaths.length > 0) {
    let attempt = 0;
    let success = false;

    while (attempt < 3) {
      try {
        await db.plantPhoto.createMany({
          data: uploadedPhotoPaths.map((url) => ({ plantId: newPlantId, url })),
        });

        success = true;

        break;
      } catch (error) {
        console.error(`Bulk insert attempt ${attempt + 1} failed:`, error);

        attempt++;
      }
    }

    // we try to save already uploaded photos on the storage to the DB 3 times, but it failed. At this point storage will have some orphaned files.
    if (!success) {
      console.error("Failed to save uploaded photos to DB after 3 attempts.");

      // add only the filename, not the full path
      failedPhotos.push(
        ...uploadedPhotoPaths.map((p) => p.split("/").pop() || p)
      );
    }
  }

  if (failedPhotos.length > 0) {
    console.log("Some photos failed to upload or save to DB:", failedPhotos);

    return {
      message: `Plant added successfully, but some photo(s) failed to upload.`,
      success: true,
    };
  }

  revalidatePath("/my-collection");

  redirect("/my-collection");
};

export default addPlant;
