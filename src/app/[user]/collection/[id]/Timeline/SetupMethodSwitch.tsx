"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UpdateTimelineEventState } from "@/lib/actions/updateTimelineEventAction";
import { predefinedEvents } from "@/lib/data/timeline-event-types";
import { TimelineEventFormData } from "@/lib/validations/timelineEvent";
import { UseFormReturn } from "react-hook-form";
import { EventStyleSelector } from "./EventStyleSelector";
import { IconRenderer } from "./IconRenderer";

interface SetupMethodSwitchProps {
  form: UseFormReturn<TimelineEventFormData>;
  isCustom: boolean;
  onToggle: (isCustom: boolean) => void;
  state?: UpdateTimelineEventState;
}

export function SetupMethodSwitch({
  form,
  isCustom,
  onToggle,
  state,
}: SetupMethodSwitchProps) {
  const { setValue, watch } = form;

  const watchedValues = watch();

  const handlePredefinedSelect = (key: string) => {
    const event = predefinedEvents[key as keyof typeof predefinedEvents];

    setValue("title", event.label);
    setValue("icon", event.icon);
    setValue("color", event.color);
  };

  return (
    <Tabs
      value={isCustom ? "custom" : "predefined"}
      onValueChange={(value) => onToggle(value === "custom")}
    >
      <div>
        <label className="text-sm font-medium block mb-2">
          Choose Event Setup Method
        </label>
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="predefined">Quick Pick</TabsTrigger>
          <TabsTrigger value="custom">Set Manually</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="predefined" className="mt-4 space-y-2">
        <FormField
          control={form.control}
          name="title"
          render={() => (
            <FormItem>
              <FormLabel>Select Event</FormLabel>
              <Select onValueChange={handlePredefinedSelect}>
                <FormControl>
                  <SelectTrigger className="!h-10">
                    <SelectValue
                      placeholder="Choose an event type"
                      className="h-5"
                    />
                  </SelectTrigger>
                </FormControl>

                <SelectContent className="max-h-60">
                  {Object.entries(predefinedEvents).map(([key, event]) => (
                    <SelectItem key={key} value={key}>
                      <div className="flex items-center gap-2">
                        <div className={`${event.color} rounded-full p-2`}>
                          <IconRenderer
                            icon={event.icon}
                            style={{ width: "16px", height: "16px" }}
                            className="text-white"
                          />
                        </div>
                        {event.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </TabsContent>

      <TabsContent value="custom" className="mt-4 space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Event title" {...field} />
              </FormControl>
              {state?.errors?.title && (
                <p className="text-sm text-red-500">{state.errors.title}</p>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <EventStyleSelector
          selectedIcon={watchedValues.icon}
          onSelectIcon={(icon) => setValue("icon", icon)}
          selectedColor={watchedValues.color}
          onSelectColor={(color) => setValue("color", color)}
        />
        {state?.errors?.icon && (
          <p className="text-sm text-red-500">{state.errors.icon}</p>
        )}
        <div className="flex items-center gap-4 mt-4">
          <Label>Live Preview:</Label>
          <div
            className={`w-10 h-10 rounded-full ${watchedValues.color} flex items-center justify-center shadow-md`}
          >
            <IconRenderer
              icon={watchedValues.icon}
              className="w-5 h-5 text-white"
            />
          </div>
          <span className="text-sm text-muted-foreground">
            {watchedValues.title || "Event Title"}
          </span>
        </div>
      </TabsContent>
    </Tabs>
  );
}
