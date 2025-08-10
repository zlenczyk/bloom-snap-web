"use server";

import NewPlantFormSchema from "./schema";
import db from "@/lib/db/db";
import { hash } from "bcryptjs";
import { redirect } from "next/navigation";
import { json } from "stream/consumers";
import AddPlantFormSchema from "./schema";

type Errors = {
  species?: string[];
  genus?: string[];
  commonName?: string[];
  nickname?: string[];
  description?: string[];
  source?: string[];
  ownedSince?: string[];
  lastRepotted?: string[];
  roomLocation?: string[];
  isPetSafe?: string[];
  isHealthy?: string[];
  windowDirection?: string[];
  isBlooming?: string[];
  isAirCleaning?: string[];
};

export type AddPlantFormState = {
  message?: string;
  success?: boolean;
  errors?: Errors;
};

const addPlant = async (state: AddPlantFormState, formData: FormData) => {
  try {
    const ownedSinceStr = formData.get("ownedSince");
    const lastRepottedStr = formData.get("lastRepotted");

    console.log("xdddd: ", formData.get("lastRepotted"));

    for (const [key, value] of formData.entries()) {
      console.log(key + ": " + value);
    }

    const validationResult = AddPlantFormSchema.safeParse({
      species: formData.get("species"),
      genus: formData.get("genus"),
      commonName: formData.get("commonName"),
      nickname: formData.get("nickname"),
      description: formData.get("description"),
      source: formData.get("source"),
      // ownedSince: ownedSinceStr ? new Date(ownedSinceStr.toString()) : undefined,
      lastRepotted: lastRepottedStr
        ? new Date(lastRepottedStr.toString())
        : undefined,
      ownedSince: formData.get("ownedSince"),
      // lastRepotted: formData.get("lastRepotted"),
      roomLocation: formData.get("roomLocation"),
      isPetSafe: formData.get("isPetSafe"),
      isHealthy: formData.get("isHealthy"),
      windowDirection: formData.get("windowDirection"),
      isBlooming: formData.get("isBlooming"),
      isAirCleaning: formData.get("isAirCleaning"),
    });

    console.log("WTF common name: ", validationResult.data?.commonName);
    console.log("WTF isBlooming: ", validationResult.data?.isBlooming);
    console.log("WTF ownedSince: ", validationResult.data?.ownedSince);

    if (!validationResult.success) {
      console.log(
        "emmmmmm: ",
        JSON.stringify(validationResult.error.flatten().fieldErrors)
      );
      return {
        errors: validationResult.error.flatten().fieldErrors,
        message: "Input validation failed. Please check your entries.",
        success: false,
      } as const;
    }

    const validData = validationResult.data;

    const transformedData: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(validData)) {
      let finalValue;

      if (value === "" || value === "null") {
        finalValue = null;
      }

      if (value === "true") {
        finalValue = true;
      }

      if (value === "false") {
        finalValue = false;
      }

      transformedData[key] = finalValue;
    }

    console.log("FORMULARZ: ", JSON.stringify(transformedData));

    return {
      success: true,
      message: "Form submitted successfully.",
    };
  } catch (error) {
    console.error("Database error:", error);
    return {
      message: "Failed to submit form. Please try again later.",
      success: false,
    };
  }
};

export default addPlant;
