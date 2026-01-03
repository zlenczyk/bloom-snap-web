import LocalDate from "@/components/LocalDate";
import { parseISO } from "date-fns";

interface ValueDisplayProps {
  value: string | Date | null;
  variant?: "info" | "stats" | "notes";
}

const isDate = (value: string): boolean => {
  const parsed = parseISO(value);

  return !isNaN(parsed.getTime());
};

const ValueDisplay = ({ value, variant = "info" }: ValueDisplayProps) => {
  let classes = "text-lg";

  switch (variant) {
    case "info":
      classes = `text-lg ${
        value ? "text-gray-900" : "text-gray-400"
      } text-right break-words whitespace-pre-wrap`;
      break;
    case "stats":
      classes = `text-lg font-semibold ${
        value ? "text-gray-900" : "text-gray-400"
      } break-words whitespace-pre-wrap`;
      break;
    case "notes":
      classes = `
        text-base 
        ${value ? "text-gray-700" : "text-gray-400 ml-1"} 
        break-words whitespace-pre-wrap
      `;
      break;
  }

  let displayValue: React.ReactNode;

  if (value instanceof Date || (typeof value === "string" && isDate(value))) {
    displayValue = <LocalDate date={value} />;
  } else {
    displayValue = value ?? "-";
  }

  return <p className={classes}>{displayValue}</p>;
};

export default ValueDisplay;
