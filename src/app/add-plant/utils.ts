export const booleanToSelectString = (
  value?: boolean | null
): "true" | "false" | undefined => {
  if (value === true) return "true";
  if (value === false) return "false";
  return;
};

export const selectStringToBoolean = (val: string): boolean | undefined => {
  if (val === "true") return true;
  if (val === "false") return false;
  return;
};
