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
  ClearableSelectTrigger,
  Select,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  EnvironmentFieldsEnum,
  GROWING_MEDIUM_OPTIONS,
  GrowingMediumEnum,
  LIGHT_EXPOSURE_OPTIONS,
  LightExposureEnum,
  WINDOW_DIRECTION_OPTIONS,
  WindowDirectionEnum,
} from "@/lib/data/plantDetailsTypes";
import { cn, toUTCDate } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { PlantForm } from "../../lib/validations/plant";
import pottingComponents from "./potting";
import { PlantFormState } from "./types";

type EnvironmentTabProps = {
  form: UseFormReturn<PlantForm>;
  state?: PlantFormState;
  endMonth: Date;
};

const EnvironmentTab = ({ form, state, endMonth }: EnvironmentTabProps) => {
  return (
    <div className="grid w-full min-w-0 grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name={EnvironmentFieldsEnum.CurrentHeight}
        render={({ field }) => (
          <FormItem className="gap-3 self-start">
            <FormLabel>How tall is it?</FormLabel>
            <FormControl>
              <Input
                placeholder="15 cm, 8 in, 1 m, etc."
                {...field}
                value={field.value || ""}
                aria-invalid={!!state?.errors?.[field.name]}
              />
            </FormControl>
            {state?.errors?.currentHeight && (
              <p className="text-sm text-destructive">
                {state.errors.currentHeight[0]}
              </p>
            )}
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={EnvironmentFieldsEnum.CurrentPotSize}
        render={({ field }) => (
          <FormItem className="gap-3 self-start">
            <FormLabel>What’s the pot size? (Diameter)</FormLabel>
            <FormControl>
              <Input
                placeholder="9 cm, 11 cm, 12 cm, etc."
                {...field}
                value={field.value || ""}
                aria-invalid={!!state?.errors?.[field.name]}
              />
            </FormControl>
            {state?.errors?.currentPotSize && (
              <p className="text-sm text-destructive">
                {state.errors.currentPotSize[0]}
              </p>
            )}
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={EnvironmentFieldsEnum.LastRepotted}
        render={({ field }) => (
          <FormItem className="gap-3 w-full self-start">
            <FormLabel>Last repotting or next planned?</FormLabel>
            <FormControl>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "justify-start text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                    aria-invalid={!!state?.errors?.[field.name]}
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
                    selected={field.value || undefined}
                    onSelect={(date) => field.onChange(toUTCDate(date))}
                    captionLayout="dropdown"
                    endMonth={endMonth}
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
        name={EnvironmentFieldsEnum.Humidity}
        render={({ field }) => (
          <FormItem className="gap-3 self-start">
            <FormLabel>Air humidity around?</FormLabel>
            <FormControl>
              <Input
                placeholder="60%, 80%, high, etc."
                {...field}
                value={field.value || ""}
                aria-invalid={!!state?.errors?.[field.name]}
              />
            </FormControl>
            {state?.errors?.humidity && (
              <p className="text-sm text-destructive">
                {state.errors.humidity[0]}
              </p>
            )}
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={EnvironmentFieldsEnum.Temperature}
        render={({ field }) => (
          <FormItem className="gap-3 self-start">
            <FormLabel>How’s the temperature there?</FormLabel>
            <FormControl>
              <Input
                placeholder="18°C, 22°C, 75°F, etc."
                {...field}
                value={field.value || ""}
                aria-invalid={!!state?.errors?.[field.name]}
              />
            </FormControl>
            {state?.errors?.temperature && (
              <p className="text-sm text-destructive">
                {state.errors.temperature[0]}
              </p>
            )}
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={EnvironmentFieldsEnum.LightExposure}
        render={({ field }) => (
          <FormItem className="gap-3 self-start">
            <FormLabel>What type of light does it get?</FormLabel>
            <FormControl className="w-full">
              <Select
                value={field.value || undefined}
                onValueChange={field.onChange}
                key={field.value}
              >
                <ClearableSelectTrigger
                  value={field.value}
                  placeholder="Select type of light"
                  onClear={() => field.onChange(undefined)}
                  aria-invalid={!!state?.errors?.[field.name]}
                />

                <SelectContent>
                  <SelectItem value={LightExposureEnum.MorningSun}>
                    {LIGHT_EXPOSURE_OPTIONS[LightExposureEnum.MorningSun].label}
                  </SelectItem>
                  <SelectItem value={LightExposureEnum.AfternoonSun}>
                    {
                      LIGHT_EXPOSURE_OPTIONS[LightExposureEnum.AfternoonSun]
                        .label
                    }
                  </SelectItem>
                  <SelectItem value={LightExposureEnum.FullDaySun}>
                    {LIGHT_EXPOSURE_OPTIONS[LightExposureEnum.FullDaySun].label}
                  </SelectItem>
                  <SelectItem value={LightExposureEnum.LowSun}>
                    {LIGHT_EXPOSURE_OPTIONS[LightExposureEnum.LowSun].label}
                  </SelectItem>
                  <SelectItem value={LightExposureEnum.Indirect}>
                    {LIGHT_EXPOSURE_OPTIONS[LightExposureEnum.Indirect].label}
                  </SelectItem>
                  <SelectItem value={LightExposureEnum.Artificial}>
                    {LIGHT_EXPOSURE_OPTIONS[LightExposureEnum.Artificial].label}
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={EnvironmentFieldsEnum.WindowDirection}
        render={({ field }) => (
          <FormItem className="gap-3 self-start">
            <FormLabel>Which way’s the window?</FormLabel>
            <FormControl className="w-full">
              <Select
                value={field.value || undefined}
                onValueChange={field.onChange}
                key={field.value}
              >
                <ClearableSelectTrigger
                  value={field.value}
                  placeholder="Select window direction"
                  onClear={() => field.onChange(undefined)}
                  aria-invalid={!!state?.errors?.[field.name]}
                />

                <SelectContent>
                  <SelectItem
                    value={WindowDirectionEnum.NorthFacingNorthernHemisphere}
                  >
                    {
                      WINDOW_DIRECTION_OPTIONS[
                        WindowDirectionEnum.NorthFacingNorthernHemisphere
                      ].label
                    }
                  </SelectItem>
                  <SelectItem
                    value={WindowDirectionEnum.SouthFacingNorthernHemisphere}
                  >
                    {
                      WINDOW_DIRECTION_OPTIONS[
                        WindowDirectionEnum.SouthFacingNorthernHemisphere
                      ].label
                    }
                  </SelectItem>
                  <SelectItem
                    value={WindowDirectionEnum.EastFacingNorthernHemisphere}
                  >
                    {
                      WINDOW_DIRECTION_OPTIONS[
                        WindowDirectionEnum.EastFacingNorthernHemisphere
                      ].label
                    }
                  </SelectItem>
                  <SelectItem
                    value={WindowDirectionEnum.WestFacingNorthernHemisphere}
                  >
                    {
                      WINDOW_DIRECTION_OPTIONS[
                        WindowDirectionEnum.WestFacingNorthernHemisphere
                      ].label
                    }
                  </SelectItem>
                  <SelectItem
                    value={WindowDirectionEnum.NorthFacingSouthernHemisphere}
                  >
                    {
                      WINDOW_DIRECTION_OPTIONS[
                        WindowDirectionEnum.NorthFacingSouthernHemisphere
                      ].label
                    }
                  </SelectItem>
                  <SelectItem
                    value={WindowDirectionEnum.SouthFacingSouthernHemisphere}
                  >
                    {
                      WINDOW_DIRECTION_OPTIONS[
                        WindowDirectionEnum.SouthFacingSouthernHemisphere
                      ].label
                    }
                  </SelectItem>
                  <SelectItem
                    value={WindowDirectionEnum.EastFacingSouthernHemisphere}
                  >
                    {
                      WINDOW_DIRECTION_OPTIONS[
                        WindowDirectionEnum.EastFacingSouthernHemisphere
                      ].label
                    }
                  </SelectItem>
                  <SelectItem
                    value={WindowDirectionEnum.WestFacingSouthernHemisphere}
                  >
                    {
                      WINDOW_DIRECTION_OPTIONS[
                        WindowDirectionEnum.WestFacingSouthernHemisphere
                      ].label
                    }
                  </SelectItem>
                  <SelectItem value={WindowDirectionEnum.NoWindow}>
                    {
                      WINDOW_DIRECTION_OPTIONS[WindowDirectionEnum.NoWindow]
                        .label
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
        name={EnvironmentFieldsEnum.RoomLocation}
        render={({ field }) => (
          <FormItem className="gap-3 self-start">
            <FormLabel>Which room/place is it in?</FormLabel>
            <FormControl>
              <Input
                placeholder="Living room, bedroom, balcony, etc."
                {...field}
                value={field.value || ""}
                aria-invalid={!!state?.errors?.[field.name]}
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
        name={EnvironmentFieldsEnum.GrowingMedium}
        render={({ field }) => (
          <FormItem className="gap-3 self-start">
            <FormLabel>Roots: what’s the growing method?</FormLabel>
            <FormControl className="w-full">
              <Select
                value={field.value || undefined}
                onValueChange={field.onChange}
                key={field.value}
              >
                <ClearableSelectTrigger
                  value={field.value}
                  placeholder="Select growing method"
                  onClear={() => field.onChange(undefined)}
                  aria-invalid={!!state?.errors?.[field.name]}
                />

                <SelectContent>
                  <SelectItem value={GrowingMediumEnum.Soil}>
                    {GROWING_MEDIUM_OPTIONS[GrowingMediumEnum.Soil].label}
                  </SelectItem>
                  <SelectItem value={GrowingMediumEnum.SemiHydroponics}>
                    {
                      GROWING_MEDIUM_OPTIONS[GrowingMediumEnum.SemiHydroponics]
                        .label
                    }
                  </SelectItem>
                  <SelectItem value={GrowingMediumEnum.Hydroponics}>
                    {
                      GROWING_MEDIUM_OPTIONS[GrowingMediumEnum.Hydroponics]
                        .label
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
        name={EnvironmentFieldsEnum.PottingMix}
        render={({ field }) => (
          <FormItem className="gap-3 self-start pb-6">
            <FormLabel>Roots: which components are the roots in?</FormLabel>
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
    </div>
  );
};

export default EnvironmentTab;
