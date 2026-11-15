"use server";

import { getDemoPhotoUrl, isDemoPhotoPath } from "@/lib/photos";
import { createSignedPhotoUrls } from "@/lib/storage";
import { PlantWithAbsolutePhotoUrls, PlantWithPhotos } from "../../types";

const createPlantPhotoAbsoluteUrls = async (
  plant: PlantWithPhotos
): Promise<PlantWithAbsolutePhotoUrls> => {
  // Sample photos of demo collections are static files; everything else lives
  // in private storage and needs a signed URL.
  const storedPaths = plant.photos
    .map((photo) => photo.url)
    .filter((path) => !isDemoPhotoPath(path));

  const signedUrls = new Map<string, string>();

  try {
    const urls = await createSignedPhotoUrls(storedPaths);

    storedPaths.forEach((path, index) => signedUrls.set(path, urls[index]));
  } catch (error) {
    console.error("Failed to generate signed URLs:", error);
  }

  const photos = plant.photos.map((photo) => ({
    ...photo,
    absoluteUrl: isDemoPhotoPath(photo.url)
      ? getDemoPhotoUrl(photo.url)
      : signedUrls.get(photo.url) ?? "",
  }));

  return { ...plant, photos };
};

export default createPlantPhotoAbsoluteUrls;
