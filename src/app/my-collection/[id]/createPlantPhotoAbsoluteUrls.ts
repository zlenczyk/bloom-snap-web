"use server";

import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { PlantWithAbsolutePhotoUrls, PlantWithPhotos } from "../types";

const createPlantPhotoAbsoluteUrls = async (
  plant: PlantWithPhotos
): Promise<PlantWithAbsolutePhotoUrls> => {
  const photos = await Promise.all(
    plant.photos.map(async (photo) => {
      const { data, error } = await supabaseAdmin.storage
        .from("bloomsnap-plant-photos")
        .createSignedUrl(photo.url, 60 * 60 * 6); // 6 hours

      if (error || !data) {
        console.error("Failed to generate signed URL:", error);
        return {
          ...photo,
          absoluteUrl: "",
        };
      }

      return {
        ...photo,
        absoluteUrl: data.signedUrl,
      };
    })
  );

  return { ...plant, photos };
};

export default createPlantPhotoAbsoluteUrls;
