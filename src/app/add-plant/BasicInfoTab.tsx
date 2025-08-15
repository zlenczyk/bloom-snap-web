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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

type BasicInfoTabProps = {
  form: UseFormReturn<any>;
  state?: any;
};

const BasicInfoTab = ({ form, state }: BasicInfoTabProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="commonName"
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
          name="species"
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
          name="genus"
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
          name="nickname"
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
          name="ownedSince"
          render={({ field }) => (
            <FormItem className="gap-3 self-start">
              <FormLabel>When did you get the plant?</FormLabel>
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
          name="source"
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
      </div>
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem className="gap-3 self-start">
            <FormLabel>How’s It Growing?</FormLabel>
            <FormControl>
              <Textarea
                rows={4}
                placeholder="Share anything you’d like - how it makes you feel, any stories you have, or tips for caring for it. Enter up to 250 characters."
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

export default BasicInfoTab;
