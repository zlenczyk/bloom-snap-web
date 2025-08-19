import db from "../db";

const deleteTimelineEvent = async (
  id: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    await db.timelineEvent.delete({
      where: { id },
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to delete timeline event:", error);
    return { success: false, error: "Failed to delete timeline event" };
  }
};

export default deleteTimelineEvent;
