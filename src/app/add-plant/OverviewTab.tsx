"use client";

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
import { Textarea } from "@/components/ui/textarea";
import {
  isAirPurifyingEnum,
  isSafeEnum,
  OverviewFieldsEnum,
} from "@/lib/data/plantDetailsTypes";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { AddPlantFormState } from "./actions";
import { AddPlantForm } from "./schema";
import { booleanToSelectString, selectStringToBoolean } from "./utils";

type OverviewTabProps = {
  form: UseFormReturn<AddPlantForm>;
  state?: AddPlantFormState;
};

const OverviewTab = ({ form, state }: OverviewTabProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name={OverviewFieldsEnum.CommonName}
          render={({ field }) => (
            <FormItem className="gap-3 self-start">
              <FormLabel>
                Common name *
                <span className="font-light text-gray-500 leading-none">
                  (required)
                </span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Philodendron pink princess"
                  autoComplete="on"
                  {...field}
                />
              </FormControl>
              {state?.errors?.commonName && (
                <p className="text-sm text-destructive">
                  {state.errors.commonName[0]}
                </p>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={OverviewFieldsEnum.Species}
          render={({ field }) => (
            <FormItem className="gap-3 self-start">
              <FormLabel>Species</FormLabel>
              <FormControl>
                <Input
                  placeholder="Philodendron"
                  autoComplete="on"
                  {...field}
                />
              </FormControl>
              {state?.errors?.species && (
                <p className="text-sm text-destructive">
                  {state.errors.species[0]}
                </p>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={OverviewFieldsEnum.Genus}
          render={({ field }) => (
            <FormItem className="gap-3 self-start">
              <FormLabel>Genus</FormLabel>
              <FormControl>
                <Input
                  placeholder="P. erubescens 'Pink Princess'"
                  autoComplete="on"
                  {...field}
                />
              </FormControl>
              {state?.errors?.genus && (
                <p className="text-sm text-destructive">
                  {state.errors.genus[0]}
                </p>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={OverviewFieldsEnum.Nickname}
          render={({ field }) => (
            <FormItem className="gap-3 self-start">
              <FormLabel>Nickname</FormLabel>
              <FormControl>
                <Input
                  placeholder="Sorceress of the Pink Grove"
                  autoComplete="on"
                  {...field}
                />
              </FormControl>
              {state?.errors?.nickname && (
                <p className="text-sm text-destructive">
                  {state.errors.nickname[0]}
                </p>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={OverviewFieldsEnum.Source}
          render={({ field }) => (
            <FormItem className="gap-3 self-start">
              <FormLabel>Where you get it?</FormLabel>
              <FormControl>
                <Input
                  placeholder="Shop name, gift, or special find"
                  autoComplete="on"
                  {...field}
                />
              </FormControl>
              {state?.errors?.source && (
                <p className="text-sm text-destructive">
                  {state.errors.source[0]}
                </p>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={OverviewFieldsEnum.OwnedSince}
          render={({ field }) => (
            <FormItem className="gap-3 self-start">
              <FormLabel>When did you get it?</FormLabel>
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
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                  />
                </PopoverContent>
              </Popover>
              {state?.errors?.ownedSince && (
                <p className="text-sm text-destructive">
                  {state.errors.ownedSince[0]}
                </p>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={OverviewFieldsEnum.IsAirPurifying}
          render={({ field }) => {
            const selectValue = booleanToSelectString(field.value);

            return (
              <FormItem className="gap-3 self-start">
                <FormLabel>Does it purify the air?</FormLabel>
                <FormControl className="w-full">
                  <Select
                    value={selectValue}
                    onValueChange={(val) => {
                      field.onChange(selectStringToBoolean(val));
                    }}
                    key={selectValue}
                  >
                    <ClearableSelectTrigger
                      value={selectValue}
                      placeholder="Select an option"
                      onClear={() => field.onChange(undefined)}
                    />

                    <SelectContent>
                      <SelectItem value="true">
                        {isAirPurifyingEnum.Yes}
                      </SelectItem>
                      <SelectItem value="false">
                        {isAirPurifyingEnum.No}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name={OverviewFieldsEnum.IsSafe}
          render={({ field }) => {
            const selectValue = booleanToSelectString(field.value);

            return (
              <FormItem className="gap-3 self-start">
                <FormLabel>Is it safe for pets or children?</FormLabel>
                <FormControl className="w-full">
                  <Select
                    value={selectValue}
                    onValueChange={(val) => {
                      field.onChange(selectStringToBoolean(val));
                    }}
                    key={selectValue}
                  >
                    <ClearableSelectTrigger
                      value={selectValue}
                      placeholder="Select an option"
                      onClear={() => field.onChange(undefined)}
                    />

                    <SelectContent>
                      <SelectItem value="true">{isSafeEnum.Yes}</SelectItem>
                      <SelectItem value="false">{isSafeEnum.No}</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            );
          }}
        />
      </div>
      <FormField
        control={form.control}
        name={OverviewFieldsEnum.Description}
        render={({ field }) => (
          <FormItem className="gap-3 self-start">
            <FormLabel>
              Share the Plant’s Story (Origins, History, Fun Facts)
            </FormLabel>
            <FormControl>
              <Textarea
                rows={4}
                placeholder="Tell us how you got this plant, why you chose it, its natural origins or habitat, and any fun stories or history. Up to 250 characters."
                autoComplete="on"
                {...field}
              />
            </FormControl>

            {state?.errors?.description && (
              <p className="text-sm text-destructive">
                {state.errors.description[0]}
              </p>
            )}
          </FormItem>
        )}
      />
    </div>
  );
};

export default OverviewTab;
