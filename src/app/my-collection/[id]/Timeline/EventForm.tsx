"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import createTimelineEvent, {
  type CreateTimelineEventState,
} from "@/lib/actions/createTimelineEvent";
import updateTimelineEvent from "@/lib/actions/updateTimelineEvent";
import { predefinedEvents } from "@/lib/data/timelineEventTypes";
import { type TimelineEvent } from "@/lib/db/schema";
import { cn, getCurrentIsoDate } from "@/lib/utils";
import {
  type TimelineEventFormData,
  timelineEventSchema,
} from "@/lib/validations/timelineEvent";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { startTransition, useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SetupMethodSwitch } from "./SetupMethodSwitch";

const initialState: CreateTimelineEventState = {
  errors: {},
  message: "",
  success: false,
};

interface EventFormProps {
  isOpen: boolean;
  onClose: () => void;
  existingEvent?: TimelineEvent | null;
  // onSave: (event: TimelineEvent) => void;
  plantId: string;
}

type TimelineAction = (
  state: CreateTimelineEventState,
  formData: FormData
) => Promise<CreateTimelineEventState>;

export function EventForm({
  isOpen,
  onClose,
  existingEvent,
  // onSave,
  plantId,
}: EventFormProps) {
  const [isCustom, setIsCustom] = useState(false);

  const action: TimelineAction = existingEvent
    ? updateTimelineEvent.bind(null, plantId, existingEvent.id)
    : createTimelineEvent.bind(null, plantId);

  const [state, formAction, isPending] = useActionState(action, initialState);

  const today = new Date();
  const endMonth = new Date(
    today.getFullYear() + 100,
    today.getMonth(),
    today.getDate()
  );

  const form = useForm<TimelineEventFormData>({
    resolver: zodResolver(timelineEventSchema),
    defaultValues: {
      title: "",
      description: "",
      date: new Date(),
      icon: predefinedEvents.purchase.icon,
      color: predefinedEvents.purchase.color,
    },
  });

  const { register, handleSubmit, reset } = form;

  useEffect(() => {
    if (state?.success && state?.event) {
      // onSave(state.event);

      handleClose();
    }
  }, [state?.success, state?.event]);

  useEffect(() => {
    if (!existingEvent) return;

    reset({
      title: existingEvent.title ?? "",
      description: existingEvent.description ?? "",
      date: existingEvent.date ? new Date(existingEvent.date) : new Date(),
      icon: existingEvent.icon ?? predefinedEvents.purchase.icon,
      color: existingEvent.color ?? predefinedEvents.purchase.color,
    });
  }, [existingEvent, reset]);

  const onSubmit = (data: TimelineEventFormData) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof Date) {
        formData.append(key, getCurrentIsoDate(value));

        return;
      }

      formData.append(key, value.toString());
    });

    startTransition(() => {
      formAction(formData);
    });
  };

  const handleClose = () => {
    reset();

    setIsCustom(false);

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {existingEvent ? "Edit Event" : "Add New Event"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <SetupMethodSwitch
              state={state}
              form={form}
              isCustom={isCustom}
              onToggle={setIsCustom}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe what happened..."
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  {state?.errors?.description && (
                    <p className="text-sm text-red-500">
                      {state.errors.description}
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        captionLayout="dropdown"
                        endMonth={endMonth}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <input type="hidden" {...register("icon")} />
            <input type="hidden" {...register("color")} />

            <div className="flex gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1 bg-transparent"
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                {isPending
                  ? "Saving..."
                  : existingEvent
                  ? "Update Event"
                  : "Add Event"}
              </Button>
              <span>{isPending}</span>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
