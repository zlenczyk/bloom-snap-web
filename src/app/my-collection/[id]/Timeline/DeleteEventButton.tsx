"use client";

import { Button } from "@/components/ui/button";
import deleteTimelineEvent from "@/lib/actions/deleteTimelineEvent";
import { Trash2 as DeleteIcon } from "lucide-react";
import { startTransition, useActionState } from "react";

interface DeleteEventButtonProps {
  plantId: string;
  eventId: string;
}

export function DeleteEventButton({
  plantId,
  eventId,
}: DeleteEventButtonProps) {
  const [state, formAction, isPending] = useActionState(
    deleteTimelineEvent.bind(null, plantId),
    null
  );

  const handleDelete = async () => {
    const formData = new FormData();

    formData.append("id", eventId);

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
