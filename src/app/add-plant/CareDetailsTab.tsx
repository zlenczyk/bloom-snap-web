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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { CultivationType } from "./CultivationType";
import { format } from "date-fns";

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
                  <SelectItem value="north-facing-northern-hemisphere">
                    North-facing (Northern Hemisphere)
                  </SelectItem>
                  <SelectItem value="south-facing-northern-hemisphere">
                    South-facing (Northern Hemisphere)
                  </SelectItem>
                  <SelectItem value="east-facing-northern-hemisphere">
                    East-facing (Northern Hemisphere)
                  </SelectItem>
                  <SelectItem value="west-facing-northern-hemisphere">
                    West-facing (Northern Hemisphere)
                  </SelectItem>
                  <SelectItem value="north-facing-southern-hemisphere">
                    North-facing (Southern Hemisphere)
                  </SelectItem>
                  <SelectItem value="south-facing-southern-hemisphere">
                    South-facing (Southern Hemisphere)
                  </SelectItem>
                  <SelectItem value="east-facing-southern-hemisphere">
                    East-facing (Southern Hemisphere)
                  </SelectItem>
                  <SelectItem value="west-facing-southern-hemisphere">
                    West-facing (Southern Hemisphere)
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="source"
        render={({ field }) => (
          <FormItem className="gap-3 self-start">
            <FormLabel>Cultivation type</FormLabel>
            <FormControl>
              <CultivationType />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
};

export default CareDetailsTab;
