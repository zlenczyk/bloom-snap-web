import { Grip } from "lucide-react";
import ValueDisplay from "./ValueDisplay";

interface GrowingMediumProps {
  mediumType: string | null;
  items?: string[];
}

const GrowingMedium = ({ mediumType, items = [] }: GrowingMediumProps) => {
  return (
    <div className="flex flex-col p-4 rounded-lg bg-gradient-to-br from-teal-400/40 to-teal-50 justify-center shadow-md h-full">
      <div className="flex flex-col items-center text-center mb-3">
        <Grip className="h-5 w-5 mb-1 text-teal-800" />
        <p className="text-sm text-gray-600">Growing Medium</p>
        <ValueDisplay value={mediumType} variant="stats" />
      </div>

      <div className="flex flex-wrap gap-2">
        {items.map((item, idx) => (
          <span
            key={idx}
            className="px-3 py-1 text-xs font-medium rounded-full border border-amber-700/30 shadow-sm text-amber-800/80 bg-gradient-to-br from-amber-700/10 to-teal-300/20 whitespace-normal break-words"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default GrowingMedium;
