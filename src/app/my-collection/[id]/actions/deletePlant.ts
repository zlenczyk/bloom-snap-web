"use server";

import { auth } from "@/auth";
import db from "@/lib/db";
import { PlantIdSchema } from "@/lib/validations/plant";
import { redirect } from "next/navigation";

export type DeletePlantState = {
  success: boolean;
  message: string;
};

const deletePlant = async (plantId: string): Promise<DeletePlantState> => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      redirect("/sign-in");
    }

    const validationResult = PlantIdSchema.safeParse({
      id: plantId,
    });

    if (!validationResult.success) {
      return {
        message: "Input validation failed. Plant ID is required.",
        success: false,
      } as const;
    }

    await db.plant.delete({
      where: {
        id: validationResult.data.id,
        userId: session.user.id,
      },
    });

    return { success: true, message: "Plant deleted successfully" };
  } catch (error) {
    console.error("Delete plant error:", error);
    return { success: false, message: "Failed to delete plant" };
  }
};

export default deletePlant;
