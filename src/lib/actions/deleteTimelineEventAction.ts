"use server";

import { revalidatePath } from "next/cache";
import { timelineEventIdSchema } from "../validations/timelineEvent";
import deleteTimelineEvent from "../db/queries/deleteTimelineEvent";

export type DeleteTimelineEventActionState = {
  success?: boolean;
  error?: string;
  message?: string;
};

const deleteTimelineEventAction = async (
  prevState: DeleteTimelineEventActionState | null,
  formData: FormData
): Promise<DeleteTimelineEventActionState> => {
  try {
    const validatedData = timelineEventIdSchema.parse({
      id: formData.get("id"),
    });

    const result = await deleteTimelineEvent(validatedData.id);

    if (!result.success) {
      return {
        success: false,
        error: result.error || "Failed to delete timeline event",
      };
    }

    revalidatePath("/");
    return { success: true, message: "Timeline event deleted successfully" };
  } catch (error) {
    console.error("Delete timeline event error:", error);
    return { success: false, error: "Failed to delete timeline event" };
  }
};

export default deleteTimelineEventAction;
