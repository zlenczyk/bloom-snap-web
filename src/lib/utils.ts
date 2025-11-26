import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getCurrentIsoDate = (date = new Date()): string => {
  const isoDateTime = date.toISOString();
  const segments = isoDateTime.split("T");
  const [isoDate] = segments;

  return isoDate;
};

export const toOptionalBooleanString = (
  value?: boolean | null
): "true" | "false" | undefined => {
  if (value === true) return "true";
  if (value === false) return "false";
  return;
};

export const toOptionalBoolean = (value: unknown): boolean | undefined => {
  if (value === "true") return true;
  if (value === "false") return false;

  return;
};
