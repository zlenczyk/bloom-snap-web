"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";
import React from "react";

type PlantStatusTabProps = {
  form: UseFormReturn<any>;
  state?: any;
};

const PlantStatusTab = ({ form, state }: PlantStatusTabProps) => {
  return (
    <React.Fragment key={`bloomingTab-${Math.random()}`}>
      <FormField
        control={form.control}
        name="isAirCleaning"
        render={({ field }) => (
          <FormItem className="gap-3 self-start">
            <FormLabel>Does it purify the air?</FormLabel>
            <span>{field.value}</span>
            <FormControl>
              <RadioGroup
                id="isAirCleaning"
                onValueChange={field.onChange}
                value={field.value ?? "null"}
                className="flex flex-col"
              >
                <FormItem className="flex items-center space-y-0">
                  <FormControl>
                    <RadioGroupItem value="null" />
                  </FormControl>
                  <FormLabel className="font-normal">Do not specify</FormLabel>
                </FormItem>

                <FormItem className="flex items-center space-y-0">
                  <FormControl>
                    <RadioGroupItem value="true" />
                  </FormControl>
                  <FormLabel className="font-normal">Yes</FormLabel>
                </FormItem>

                <FormItem className="flex items-center space-y-0">
                  <FormControl>
                    <RadioGroupItem value="false" />
                  </FormControl>
                  <FormLabel className="font-normal">No</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            {state?.errors?.isAirCleaning && (
              <p className="text-sm text-destructive">
                {state.errors.isAirCleaning[0]}
              </p>
            )}
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="isPetSafe"
        render={({ field }) => (
          <FormItem className="gap-3 self-start">
            <FormLabel>Is it safe for pets?</FormLabel>
            <FormControl>
              <RadioGroup
                id="isPetSafe"
                onValueChange={field.onChange}
                value={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-y-0">
                  <FormControl>
                    <RadioGroupItem value="null" />
                  </FormControl>
                  <FormLabel className="font-normal">Do not specify</FormLabel>
                </FormItem>

                <FormItem className="flex items-center space-y-0">
                  <FormControl>
                    <RadioGroupItem value="true" />
                  </FormControl>
                  <FormLabel className="font-normal">Yes</FormLabel>
                </FormItem>

                <FormItem className="flex items-center space-y-0">
                  <FormControl>
                    <RadioGroupItem value="false" />
                  </FormControl>
                  <FormLabel className="font-normal">No</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            {state?.errors?.isPetSafe && (
              <p className="text-sm text-destructive">
                {state.errors.isPetSafe[0]}
              </p>
            )}
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="isHealthy"
        render={({ field }) => (
          <FormItem className="gap-3 self-start">
            <FormLabel>Is it healthy now?</FormLabel>
            <span>{field.value}</span>
            <FormControl>
              <RadioGroup
                id="isHealthy"
                onValueChange={field.onChange}
                value={field.value ?? "null"}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-y-0">
                  <FormControl>
                    <RadioGroupItem
                      checked={field.value === "null"}
                      value="null"
                    />
                  </FormControl>
                  <FormLabel className="font-normal">Do not specify</FormLabel>
                </FormItem>

                <FormItem className="flex items-center space-y-0">
                  <FormControl>
                    <RadioGroupItem
                      checked={field.value === "true"}
                      value="true"
                    />
                  </FormControl>
                  <FormLabel className="font-normal">Yes</FormLabel>
                </FormItem>

                <FormItem className="flex items-center space-y-0">
                  <FormControl>
                    <RadioGroupItem
                      checked={field.value === "false"}
                      value="false"
                    />
                  </FormControl>
                  <FormLabel className="font-normal">No</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            {state?.errors?.isHealthy && (
              <p className="text-sm text-destructive">
                {state.errors.isHealthy[0]}
              </p>
            )}
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="isBlooming"
        render={({ field }) => (
          <FormItem className="gap-3 self-start">
            <FormLabel>Is it blooming now?</FormLabel>
            <FormControl>
              <RadioGroup
                id="isBlooming"
                onValueChange={field.onChange}
                value={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-y-0">
                  <FormControl>
                    <RadioGroupItem value="null" />
                  </FormControl>
                  <FormLabel className="font-normal">Do not specify</FormLabel>
                </FormItem>

                <FormItem className="flex items-center space-y-0">
                  <FormControl>
                    <RadioGroupItem value="true" />
                  </FormControl>
                  <FormLabel className="font-normal">Yes</FormLabel>
                </FormItem>

                <FormItem className="flex items-center space-y-0">
                  <FormControl>
                    <RadioGroupItem value="false" />
                  </FormControl>
                  <FormLabel className="font-normal">No</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            {state?.errors?.isBlooming && (
              <p className="text-sm text-destructive">
                {state.errors.isBlooming[0]}
              </p>
            )}
          </FormItem>
        )}
      />
    </React.Fragment>
  );
};

export default PlantStatusTab;
