export const getCurrentIsoDate = (date = new Date()): string => {
  const isoDateTime = date.toISOString();
  const segments = isoDateTime.split("T");
  const [isoDate] = segments;

  return isoDate;
};