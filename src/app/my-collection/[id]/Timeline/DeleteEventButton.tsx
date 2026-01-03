"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDate } from "@/lib/utils";
import { Trash2 as DeleteIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import deleteTimelineEvent from "../actions/deleteTimelineEvent";

interface DeleteEventButtonProps {
  plantId: string;
  eventId: string;
  eventTitle: string;
  eventDate: Date;
  isFuture: boolean;
}

export function DeleteEventButton({
  plantId,
  eventId,
  eventTitle,
  eventDate,
  isFuture,
}: DeleteEventButtonProps) {
  const [state, formAction, isPending] = useActionState(
    deleteTimelineEvent.bind(null, plantId),
    null
  );
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const router = useRouter();

  const handleDelete = async () => {
    const formData = new FormData();

    formData.append("id", eventId);

    startTransition(() => {
      formAction(formData);
    });
  };

  useEffect(() => {
    if (!state?.message) {
      return;
    }

    if (state.success) {
      toast.success(`Event deleted successfully`);

      router.refresh();

      return;
    }

    toast.error(`Failed to delete event`);
  }, [state]);

  return (
    <>
      <Button
        type="submit"
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600 ml-1"
        disabled={isPending}
        onClick={() => setOpenDeleteDialog(true)}
      >
        <DeleteIcon className="w-3 h-3" />
      </Button>

      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent className="rounded-lg">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              🗑️ You're about to remove a {isFuture ? "future" : "past"} event{" "}
              <span className="font-medium text-zinc-800">{eventTitle}</span>{" "}
              {isFuture ? "planned for" : "from"}{" "}
              <span className="font-medium text-zinc-800">
                {formatDate(eventDate)}
              </span>
              . Once it’s gone, it won’t come back 😬
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button
              variant="outline"
              disabled={isPending}
              onClick={() => setOpenDeleteDialog(false)}
            >
              Cancel
            </Button>

            <Button
              disabled={isPending}
              variant="destructive"
              onClick={handleDelete}
            >
              {isPending ? "Deleting..." : "Yes, delete it"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
