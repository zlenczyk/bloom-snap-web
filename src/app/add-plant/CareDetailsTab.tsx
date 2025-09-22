"use client";

import MultiSelectTagInput from "@/components/MultiSelectTagInput/MultiSelectTagInput";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import pottingComponents from "./potting";
import {
  WINDOW_DIRECTION_OPTIONS,
  WindowDirection,
} from "@/lib/data/window-direction";
import {
  LIGHT_EXPOSURE_OPTIONS,
  LightExposure,
} from "@/lib/data/light-exposure";

type CareDetailsTabProps = {
  form: UseFormReturn<any>;
  state?: any;
};

const CareDetailsTab = ({ form, state }: CareDetailsTabProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="roomLocation"
        render={({ field }) => (
          <FormItem className="gap-3 self-start">
            <FormLabel>Which room/place is it in?</FormLabel>
            <FormControl>
              <Input
                placeholder="Living room, bedroom, balcony, etc."
                {...field}
              />
            </FormControl>
            {state?.errors?.roomLocation && (
              <p className="text-sm text-destructive">
                {state.errors.roomLocation[0]}
              </p>
            )}
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="lastRepotted"
        render={({ field }) => (
          <FormItem className="gap-3 w-full self-start">
            <FormLabel>Last time repotted</FormLabel>
            <FormControl>
              <Popover>
                <PopoverTrigger asChild>
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
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={form.getValues("lastRepotted")}
                    onSelect={field.onChange}
                    startMonth={new Date(1950, 0, 1)}
                    endMonth={new Date()}
                    disabled={{ after: new Date() }}
                  />
                </PopoverContent>
              </Popover>
            </FormControl>
            {state?.errors?.lastRepotted && (
              <p className="text-sm text-destructive">
                {state.errors.lastRepotted[0]}
              </p>
            )}
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="windowDirection"
        render={({ field }) => (
          <FormItem className="gap-3 self-start">
            <FormLabel>Window direction</FormLabel>
            <FormControl className="w-full">
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a direction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="null">Do not specify</SelectItem>
                  <SelectItem
                    value={WindowDirection.NorthFacingNorthernHemisphere}
                  >
                    {
                      WINDOW_DIRECTION_OPTIONS[
                        WindowDirection.NorthFacingNorthernHemisphere
                      ].label
                    }
                  </SelectItem>
                  <SelectItem
                    value={WindowDirection.SouthFacingNorthernHemisphere}
                  >
                    {
                      WINDOW_DIRECTION_OPTIONS[
                        WindowDirection.SouthFacingNorthernHemisphere
                      ].label
                    }
                  </SelectItem>
                  <SelectItem
                    value={WindowDirection.EastFacingNorthernHemisphere}
                  >
                    {
                      WINDOW_DIRECTION_OPTIONS[
                        WindowDirection.EastFacingNorthernHemisphere
                      ].label
                    }
                  </SelectItem>
                  <SelectItem
                    value={WindowDirection.WestFacingNorthernHemisphere}
                  >
                    {
                      WINDOW_DIRECTION_OPTIONS[
                        WindowDirection.WestFacingNorthernHemisphere
                      ].label
                    }
                  </SelectItem>
                  <SelectItem
                    value={WindowDirection.NorthFacingSouthernHemisphere}
                  >
                    {
                      WINDOW_DIRECTION_OPTIONS[
                        WindowDirection.NorthFacingSouthernHemisphere
                      ].label
                    }
                  </SelectItem>
                  <SelectItem
                    value={WindowDirection.SouthFacingSouthernHemisphere}
                  >
                    {
                      WINDOW_DIRECTION_OPTIONS[
                        WindowDirection.SouthFacingSouthernHemisphere
                      ].label
                    }
                  </SelectItem>
                  <SelectItem
                    value={WindowDirection.EastFacingSouthernHemisphere}
                  >
                    {
                      WINDOW_DIRECTION_OPTIONS[
                        WindowDirection.EastFacingSouthernHemisphere
                      ].label
                    }
                  </SelectItem>
                  <SelectItem
                    value={WindowDirection.WestFacingSouthernHemisphere}
                  >
                    {
                      WINDOW_DIRECTION_OPTIONS[
                        WindowDirection.WestFacingSouthernHemisphere
                      ].label
                    }
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="lightExposure"
        render={({ field }) => (
          <FormItem className="gap-3 self-start">
            <FormLabel>Light exposure</FormLabel>
            <FormControl className="w-full">
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select light exposure" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="null">Do not specify</SelectItem>
                  <SelectItem value={LightExposure.MorningSun}>
                    {LIGHT_EXPOSURE_OPTIONS[LightExposure.MorningSun].label}
                  </SelectItem>
                  <SelectItem value={LightExposure.AfternoonSun}>
                    {LIGHT_EXPOSURE_OPTIONS[LightExposure.AfternoonSun].label}
                  </SelectItem>
                  <SelectItem value={LightExposure.FullDaySun}>
                    {LIGHT_EXPOSURE_OPTIONS[LightExposure.FullDaySun].label}
                  </SelectItem>
                  <SelectItem value={LightExposure.LowSun}>
                    {LIGHT_EXPOSURE_OPTIONS[LightExposure.LowSun].label}
                  </SelectItem>
                  <SelectItem value={LightExposure.Indirect}>
                    {LIGHT_EXPOSURE_OPTIONS[LightExposure.Indirect].label}
                  </SelectItem>
                  <SelectItem value={LightExposure.Artificial}>
                    {LIGHT_EXPOSURE_OPTIONS[LightExposure.Artificial].label}
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="growingMedium"
        render={({ field }) => (
          <FormItem className="gap-3 self-start">
            <FormLabel>Growing Medium</FormLabel>
            <FormControl className="w-full">
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select light exposure" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="null">Do not specify</SelectItem>
                  <SelectItem value="soil">Soil</SelectItem>
                  <SelectItem value="semi-hydroponics">
                    Semi-hydroponics
                  </SelectItem>
                  <SelectItem value="hydroponics">Hydroponics</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="pottingMix"
        render={({ field }) => (
          <FormItem className="gap-3 self-start">
            <FormLabel>Potting Mix</FormLabel>
            <FormControl>
              <MultiSelectTagInput
                options={pottingComponents}
                selectedItems={field.value ?? []}
                onChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
};

export default CareDetailsTab;
