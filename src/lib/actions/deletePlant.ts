"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";
import db from "../db/db";
import { PlantIdSchema } from "../validations/plant";

export type DeletePlantState = {
  success?: boolean;
  error?: string;
  message?: string;
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
      console.log(
        "zod flattened errors with field errors:",
        z.flattenError(validationResult.error).fieldErrors
      );

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

    revalidatePath("/my-collection");

    return { success: true, message: "Plant deleted successfully" };
  } catch (error) {
    console.error("Delete plant error:", error);
    return { success: false, error: "Failed to delete plant" };
  }
};

export default deletePlant;
