"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { ChangeEvent, useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { AddPlantFormState } from "./actions";
import { AddPlantForm } from "./schema";

type PhotosTabProps = {
  form: UseFormReturn<AddPlantForm>;
  state?: AddPlantFormState;
};

const MAX_IMAGES = 5;

const PhotosTab = ({ form, state }: PhotosTabProps) => {
  const { control, setValue, watch } = form;
  const files: File[] = watch("photos") || [];
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);

    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [JSON.stringify(files)]);

  const handleAddFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (!selected) return;

    const remainingSlots = MAX_IMAGES - files.length;
    if (remainingSlots <= 0) return;

    const newFiles = Array.from(selected).slice(0, remainingSlots);
    const combinedFiles = [...files, ...newFiles];
    setValue("photos", combinedFiles, { shouldValidate: true });

    e.target.value = "";
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setValue("photos", updatedFiles, { shouldValidate: true });
  };

  const isMaxReached = files.length >= MAX_IMAGES;

  return (
    <div className="flex flex-col gap-6">
      <FormField
        control={control}
        name="photos"
        render={({ field }) => (
          <FormItem className="gap-3 self-start">
            <FormLabel>Upload Photos (max {MAX_IMAGES})</FormLabel>
            <FormControl>
              <input
                type="file"
                accept="image/*"
                multiple
                className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                           file:rounded file:border-0 file:text-sm file:font-semibold
                           file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100
                           disabled:opacity-50 disabled:cursor-not-allowed"
                onChange={handleAddFiles}
                disabled={isMaxReached}
              />
            </FormControl>
            {isMaxReached && (
              <p className="text-xs text-gray-500 mt-1">
                Maximum {MAX_IMAGES} photos uploaded. Remove a photo to upload a
                new one.
              </p>
            )}
          </FormItem>
        )}
      />

      {previewUrls.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {previewUrls.map((url, idx) => (
            <div
              key={idx}
              className="relative w-full aspect-square rounded overflow-hidden border"
            >
              <img
                src={url}
                alt={`preview ${idx + 1}`}
                className="object-cover w-full h-full"
              />
              <Button
                size="icon"
                variant="destructive"
                className="absolute top-1 right-1 p-1 rounded-full"
                onClick={() => handleRemoveFile(idx)}
              >
                ×
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotosTab;
