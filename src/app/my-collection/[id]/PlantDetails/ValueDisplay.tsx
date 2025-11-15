interface ValueDisplayProps {
  value: string | null;
  variant?: "info" | "stats" | "notes";
}

const ValueDisplay = ({ value, variant = "info" }: ValueDisplayProps) => {
  let classes = "text-lg";

  switch (variant) {
    case "info":
      classes = `text-lg ${
        value ? "text-gray-900" : "text-gray-400"
      } text-right`;
      break;
    case "stats":
      classes = `text-lg font-semibold ${
        value ? "text-gray-900" : "text-gray-400"
      }`;
      break;
    case "notes":
      classes = `
        text-base 
        ${value ? "text-gray-700" : "text-gray-400 ml-1"} 
        break-words whitespace-pre-wrap
      `;
      break;
  }

  return <p className={classes}>{value ?? "-"}</p>;
};

export default ValueDisplay;
