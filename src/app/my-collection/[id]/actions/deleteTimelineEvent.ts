"use server";

import { auth } from "@/auth";
import db from "@/lib/db";
import { timelineEventIdSchema } from "@/lib/validations/timelineEvent";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

export type DeleteTimelineEventState = {
  success: boolean;
  error?: string;
  message: string;
};

const deleteTimelineEvent = async (
  plantId: string,
  prevState: DeleteTimelineEventState | null,
  formData: FormData
): Promise<DeleteTimelineEventState> => {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  try {
    const validationResult = timelineEventIdSchema.safeParse({
      id: formData.get("id"),
    });

    if (!validationResult.success) {
      console.log(
        "zod flattened errors with field errors:",
        z.flattenError(validationResult.error).fieldErrors
      );

      return {
        message: "Input validation failed. Timeline event ID is required.",
        success: false,
      } as const;
    }

    await db.timelineEvent.delete({
      where: { id: validationResult.data.id },
    });

    return { success: true, message: "Timeline event deleted successfully" };
  } catch (error) {
    console.error("Delete timeline event error:", error);
    return { success: false, message: "Failed to delete timeline event" };
  }
};

export default deleteTimelineEvent;
