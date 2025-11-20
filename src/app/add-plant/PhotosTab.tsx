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
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleAddFiles}
                disabled={isMaxReached}
                className="pr-2 pl-1 text-sm text-gray-600 file:mr-4 file:px-4 file:rounded-md file:bg-zinc-50 hover:file:bg-zinc-100 file:text-gray-700 file:text-sm rounded-md"
                aria-invalid={!!state?.errors?.[field.name]}
              />
            </FormControl>
            {state?.errors?.photos && Array.isArray(state.errors.photos) && (
              <p className="text-sm text-destructive">
                {state.errors.photos.length === 1 ? (
                  <>Image: {state.errors.photos[0]} is invalid.</>
                ) : (
                  <>Images: {state.errors.photos.join(", ")} are invalid.</>
                )}
              </p>
            )}

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
          {previewUrls.map((url, idx) => {
            const filename = files[idx]?.name;
            const isInvalid =
              filename && state?.errors?.photos?.includes(filename);

            return (
              <div
                key={idx}
                className={`relative w-full aspect-square rounded-md overflow-hidden border ${
                  isInvalid ? "border-red-500 border-2" : "border-gray-200"
                }`}
              >
                <img
                  src={url}
                  alt={`preview ${idx + 1}`}
                  className="object-cover w-full h-full"
                />
                <Button
                  type="button"
                  className="absolute h-8 w-8 top-1 right-1 p-1 rounded-full bg-red-600 hover:bg-red-700"
                  onClick={() => handleRemoveFile(idx)}
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
