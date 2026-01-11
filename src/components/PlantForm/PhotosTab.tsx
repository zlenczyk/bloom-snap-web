"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { XIcon } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { PlantWithAbsolutePhotoUrls } from "../../app/my-collection/types";
import { PlantForm } from "../../lib/validations/plant";
import { PlantFormState } from "./types";

type PhotosTabProps = {
  form: UseFormReturn<PlantForm>;
  state?: PlantFormState;
  existingPlant?: PlantWithAbsolutePhotoUrls | null;
};

const MAX_IMAGES = 5;

const PhotosTab = ({ form, state, existingPlant }: PhotosTabProps) => {
  const { control, setValue, watch } = form;

  const photos = watch("photos") || [];

  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    const urls = photos.map((item) => {
      if (typeof item === "string") {
        const absolute = existingPlant?.photos.find(
          (p) => p.url === item
        )?.absoluteUrl;

        return absolute || item;
      }

      return URL.createObjectURL(item);
    });

    setPreviewUrls(urls);

    return () => {
      urls.forEach((url, idx) => {
        if (photos[idx] instanceof File) URL.revokeObjectURL(url);
      });
    };
  }, [JSON.stringify(photos), existingPlant]);

  const handleAddFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const remainingSlots = MAX_IMAGES - photos.length;
    if (remainingSlots <= 0) return;

    const newFiles = Array.from(selectedFiles).slice(0, remainingSlots);

    const combined = [...photos, ...newFiles];
    setValue("photos", combined, { shouldValidate: true });

    e.target.value = "";
  };

  const handleRemove = (index: number) => {
    const updated = [...photos];
    updated.splice(index, 1);
    setValue("photos", updated, { shouldValidate: true });
  };

  const isMaxReached = photos.length >= MAX_IMAGES;

  return (
    <div className="flex flex-col shrink-0 gap-6">
      <FormField
        control={control}
        name="photos"
        render={({ field }) => (
          <FormItem className="gap-3 self-start">
            <FormLabel>Upload Photos (max {MAX_IMAGES})</FormLabel>
            <FormControl>
              <Input
                type="file"
                accept="image/*"
                multiple
                disabled={isMaxReached}
                onChange={handleAddFiles}
                className="pr-2 pl-1 text-sm text-gray-600 
                  file:mr-4 file:px-4 file:rounded-md file:bg-zinc-50 
                  hover:file:bg-zinc-100 file:text-gray-700 file:text-sm rounded-md"
                aria-invalid={!!state?.errors?.[field.name]}
              />
            </FormControl>

            {state?.errors?.photos && (
              <p className="text-sm text-destructive">
                {Array.isArray(state.errors.photos)
                  ? state.errors.photos.join(", ")
                  : state.errors.photos}
              </p>
            )}

            {isMaxReached && (
              <p className="text-xs text-gray-500 mt-1">
                Maximum {MAX_IMAGES} photos uploaded. Remove one to add new.
              </p>
            )}
          </FormItem>
        )}
      />

      {previewUrls.length > 0 && (
        <div className="grid auto-rows-max grid-cols-2 sm:grid-cols-3 gap-4">
          {previewUrls.map((url, idx) => {
            const item = photos[idx];

            const fileName = item instanceof File ? item.name : null;

            const isInvalid =
              fileName &&
              state?.errors?.photos?.some((err) => err.includes(fileName));

            return (
              <div
                key={idx}
                className={`relative w-full aspect-square rounded-md overflow-hidden border ${
                  isInvalid ? "border-red-500 border-2" : "border-gray-200"
                }`}
              >
                <img
                  src={url}
                  alt={`photo ${idx + 1}`}
                  className="object-cover w-full h-full"
                />

                <Button
                  type="button"
                  className="absolute h-8 w-8 top-1 right-1 p-1 rounded-full bg-red-600 hover:bg-red-700"
                  onClick={() => handleRemove(idx)}
                >
                  <XIcon className="w-4 h-4" />
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PhotosTab;
