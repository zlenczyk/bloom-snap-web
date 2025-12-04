"use server";

import { auth } from "@/auth";
import db from "@/lib/db/db";
import { redirect } from "next/navigation";
import { PlantWithAbsolutePhotoUrls } from "../types";
import createPlantPhotoAbsoluteUrls from "./createPlantPhotoAbsoluteUrls";

export const getPlantDetails = async (
  plantId: string
): Promise<PlantWithAbsolutePhotoUrls> => {
  const session = await auth();

  if (!session?.user) redirect("/sign-in");

  const userId = session.user.id;

  try {
    const plant = await db.plant.findFirst({
      where: { id: plantId, userId },
      include: { photos: true },
    });

    if (!plant) {
      throw new Error("Plant not found");
    }

    const plantWithPhotoLinks = await createPlantPhotoAbsoluteUrls(plant);

    return plantWithPhotoLinks;
  } catch (error) {
    console.error("Error fetching plant details:", error);

    redirect("/my-collection");
  }
};
