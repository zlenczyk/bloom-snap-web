"use server";

import { createSignedPhotoUrls } from "@/lib/storage";
import { PlantWithAbsolutePhotoUrls, PlantWithPhotos } from "../../types";

const createPlantPhotoAbsoluteUrls = async (
  plant: PlantWithPhotos
): Promise<PlantWithAbsolutePhotoUrls> => {
  let signedUrls: string[] = [];

  try {
    signedUrls = await createSignedPhotoUrls(plant.photos.map((p) => p.url));
  } catch (error) {
    console.error("Failed to generate signed URLs:", error);
  }

  const photos = plant.photos.map((photo, index) => ({
    ...photo,
    absoluteUrl: signedUrls[index] ?? "",
  }));

  return { ...plant, photos };
};

export default createPlantPhotoAbsoluteUrls;
