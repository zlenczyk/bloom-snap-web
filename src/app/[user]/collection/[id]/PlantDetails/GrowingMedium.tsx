import { Grip } from "lucide-react";
interface GrowingMediumProps {
  mediumType: string;
  items?: string[];
}

const GrowingMedium = ({ mediumType, items = [] }: GrowingMediumProps) => {
  return (
    <div className="flex flex-col p-4 rounded-lg bg-gradient-to-br from-green-400/50 to-green-50 justify-center shadow-md h-full">
      <div className="flex flex-col items-center text-center mb-3">
        <Grip className="h-5 w-5 mb-1 text-green-800" />
        <p className="text-sm text-gray-600">Growing Medium</p>
        <p className="text-lg font-semibold text-gray-900">{mediumType}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {items.map((item, idx) => (
          <span
            key={idx}
            className="px-3 py-1 text-xs font-medium rounded-full bg-amber-800/10 text-amber-800/80 border border-amber-800/30 shadow-sm"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default GrowingMedium;
