"use client";

import { startTransition, useActionState } from "react";
import { Trash2 as DeleteIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import deleteTimelineEventAction from "@/lib/actions/deleteTimelineEventAction";

interface DeleteEventButtonProps {
  eventId: string;
  onDelete: (eventId: string) => void;
}

export function DeleteEventButton({
  eventId,
  onDelete,
}: DeleteEventButtonProps) {
  const [state, formAction, isPending] = useActionState(
    deleteTimelineEventAction,
    null
  );

  const handleDelete = async () => {
    const formData = new FormData();

    formData.append("id", eventId);

    onDelete(eventId);

    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <Button
      type="submit"
      variant="ghost"
      size="sm"
      className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
      disabled={isPending}
      onClick={handleDelete}
    >
      <DeleteIcon className="w-3 h-3" />
    </Button>
  );
}
