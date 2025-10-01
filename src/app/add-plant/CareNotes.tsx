"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { NotesFieldsEnum } from "@/lib/data/plantDetailsTypes";
import { AddPlantFormState } from "./actions";
import { AddPlantForm } from "./schema";

type CareNotesProps = {
  form: UseFormReturn<AddPlantForm>;
  state?: AddPlantFormState;
};

const CareNotes = ({ form, state }: CareNotesProps) => {
  return (
    <div className="flex flex-col gap-6">
      <FormField
        control={form.control}
        name={NotesFieldsEnum.WateringNotes}
        render={({ field }) => (
          <FormItem className="gap-3 w-full">
            <FormLabel>How do you water this plant?</FormLabel>
            <FormControl>
              <Textarea
                placeholder="I usually water it every other morning, letting the soil dry in between. I avoid overwatering to keep the roots happy."
                autoComplete="on"
                {...field}
              />
            </FormControl>

            {state?.errors?.wateringNotes && (
              <p className="text-sm text-destructive">
                {state.errors.wateringNotes[0]}
              </p>
            )}
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={NotesFieldsEnum.MistingNotes}
        render={({ field }) => (
          <FormItem className="gap-3 w-full">
            <FormLabel>
              What is your plant misting or spraying routine?
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="I lightly mist the leaves a few times a week, mostly in the afternoon. I avoid spraying directly on flowers."
                autoComplete="on"
                {...field}
              />
            </FormControl>

            {state?.errors?.mistingNotes && (
              <p className="text-sm text-destructive">
                {state.errors.mistingNotes[0]}
              </p>
            )}
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={NotesFieldsEnum.LeafCleaningNotes}
        render={({ field }) => (
          <FormItem className="gap-3 w-full">
            <FormLabel>How do you clean the leaves?</FormLabel>
            <FormControl>
              <Textarea
                placeholder="I wipe the leaves gently with a soft cloth once a week. I try to keep it simple and avoid using any chemicals."
                autoComplete="on"
                {...field}
              />
            </FormControl>

            {state?.errors?.leafCleaningNotes && (
              <p className="text-sm text-destructive">
                {state.errors.leafCleaningNotes[0]}
              </p>
            )}
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={NotesFieldsEnum.FertilizingNotes}
        render={({ field }) => (
          <FormItem className="gap-3 w-full">
            <FormLabel>What is your fertilizing routine?</FormLabel>
            <FormControl>
              <Textarea
                placeholder="I fertilize once a month with a mild liquid fertilizer. During winter, I usually skip it and let the plant rest."
                autoComplete="on"
                {...field}
              />
            </FormControl>

            {state?.errors?.fertilizingNotes && (
              <p className="text-sm text-destructive">
                {state.errors.fertilizingNotes[0]}
              </p>
            )}
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={NotesFieldsEnum.AdditionalNotes}
        render={({ field }) => (
          <FormItem className="gap-3 w-full">
            <FormLabel>Any additional care notes or instructions?</FormLabel>
            <FormControl>
              <Textarea
                placeholder="I usually rotate it every few days so it grows evenly. I also watch for pests during humid months and try to keep it near indirect sunlight."
                autoComplete="on"
                {...field}
              />
            </FormControl>

            {state?.errors?.additionalNotes && (
              <p className="text-sm text-destructive">
                {state.errors.additionalNotes[0]}
              </p>
            )}
          </FormItem>
        )}
      />
    </div>
  );
};

export default CareNotes;
