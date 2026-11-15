"use server";

import { auth } from "@/auth";
import { PlantFormState } from "@/components/PlantForm/types";
import db from "@/lib/db";
import { isOwnPhotoPath } from "@/lib/photos";
import { deletePhotos } from "@/lib/storage";
import { toOptionalBoolean } from "@/lib/utils";
import { PlantFormSchema } from "@/lib/validations/plant";
import { redirect } from "next/navigation";
import z from "zod";

export const updatePlant = async (
  plantId: string,
  state: PlantFormState,
  formData: FormData
): Promise<PlantFormState> => {
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

  const validationResult = PlantFormSchema.safeParse({
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
    isSafe: toOptionalBoolean(formData.get("isSafe")) ?? null,
    windowDirection: formData.get("windowDirection") || null,
    isAirPurifying: toOptionalBoolean(formData.get("isAirPurifying")) ?? null,
    photos: formData.getAll("photos").slice(0, 5) ?? [],
  });

  if (!validationResult.success) {
    return {
      errors: z.flattenError(validationResult.error).fieldErrors,
      message: "Input validation failed. Please check your entries.",
      success: false,
    };
  }

  const validData = validationResult.data;

  // Only the owner may edit a plant.
  const existingPlant = await db.plant.findFirst({
    where: { id: plantId, userId },
    include: { photos: true },
  });

  if (!existingPlant) {
    return {
      success: false,
      message: "Plant not found.",
    };
  }

  const existingPhotos = existingPlant.photos;

  // Photos are uploaded by the browser straight to storage; the form only
  // carries storage paths: ones already saved for this plant, plus new ones,
  // which must point into the user's own folder.
  const photosToKeep = validData.photos.filter((p) => typeof p === "string");

  const uploadedPhotoPaths = photosToKeep.filter(
    (path) => !existingPhotos.some((photo) => photo.url === path)
  );

  if (uploadedPhotoPaths.some((path) => !isOwnPhotoPath(path, userId))) {
    return {
      errors: { photos: ["Some photos could not be attached."] },
      message: "Input validation failed. Please check your entries.",
      success: false,
    };
  }

  try {
    await db.plant.update({
      where: { id: plantId, userId },
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
        wateringNotes: validData.wateringNotes,
        windowDirection: validData.windowDirection || undefined,
      },
    });
  } catch (err) {
    console.error("Database error:", err);
    return {
      success: false,
      message: "Failed to update plant. Please try again later.",
    };
  }

  const photosToDelete = existingPhotos.filter(
    (p) => !photosToKeep.includes(p.url)
  );

  for (const photo of photosToDelete) {
    try {
      await deletePhotos([photo.url]);

      await db.plantPhoto.delete({ where: { id: photo.id } });
    } catch (err) {
      console.error("Failed to delete photo:", err);
    }
  }

  const failedPhotos: string[] = []; // uploaded, but not saved to db

  if (uploadedPhotoPaths.length > 0) {
    let attempt = 0;
    let success = false;

    while (attempt < 3) {
      try {
        await db.plantPhoto.createMany({
          data: uploadedPhotoPaths.map((url) => ({ plantId, url })),
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
    console.log("Some photos failed to save to DB:", failedPhotos);

    return {
      message: `${validData.commonName} updated successfully, but some photo(s) failed to upload.`,
      success: true,
      id: plantId,
    };
  }

  return {
    message: `${validData.commonName} updated successfully`,
    success: true,
    id: plantId,
  };
};

export default updatePlant;
