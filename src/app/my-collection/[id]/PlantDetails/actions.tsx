import { auth } from "@/auth";
import db from "@/lib/db/db";
import { Plant } from "@prisma/client";
import { redirect } from "next/navigation";

export async function getPlantDetails(plantId: string): Promise<Plant> {
  const session = await auth();

  if (!session?.user) redirect("/sign-in");

  const userId = session.user.id;

  const plant = await db.plant.findFirst({
    where: {
      id: plantId,
      userId,
    },
  });

  if (!plant) {
    redirect("/my-collection");
  }

  return plant;
}
