"use server";

import { auth } from "@/auth";
import db from "@/lib/db/db";
import { redirect } from "next/navigation";
import { PlantWithAbsolutePhotoUrls } from "../../types";
import createPlantPhotoAbsoluteUrls from "../createPlantPhotoAbsoluteUrls";

export async function getPlantDetails(
  plantId: string
): Promise<PlantWithAbsolutePhotoUrls> {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");

  const userId = session.user.id;

  const plant = await db.plant.findFirst({
    where: { id: plantId, userId },
    include: { photos: true },
  });

  if (!plant) redirect("/my-collection");

  const plantWithPhotoLinks = await createPlantPhotoAbsoluteUrls(plant);

  return plantWithPhotoLinks;
}
