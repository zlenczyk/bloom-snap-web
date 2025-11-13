import { Separator } from "@/components/ui/separator";
import { BookOpenText, Calendar, MapPin, ShoppingBag } from "lucide-react";
import ValueDisplay from "./ValueDisplay";

interface BackgroundProps {
  background: {
    source: string | null;
    ownedSince: Date | null;
    description: string | null;
  };
}

const Background = ({ background }: BackgroundProps) => {
  return (
    <section
      id="plant-identity"
      className="bg-white rounded-xl p-6 shadow-md border border-gray-100 col-span-full"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-blue-100">
          <ShoppingBag className="h-5 w-5 text-blue-700" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Background</h2>
      </div>

      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-gray-500" />
          <label className="text-sm font-medium text-gray-500">Source</label>
        </div>
        <ValueDisplay value={background.source} variant="info" />
      </div>

      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <label className="text-sm font-medium text-gray-500">
            Owned Since
          </label>
        </div>
        <ValueDisplay
          value={
            background.ownedSince
              ? background.ownedSince.toLocaleDateString()
              : null
          }
          variant="info"
        />
      </div>

      <Separator className="my-3" />

      <div className="flex items-center gap-2 mb-2">
        <BookOpenText className="h-4 w-4 text-gray-500" />
        <label className="text-sm font-medium text-gray-500">Description</label>
      </div>
      <ValueDisplay value={background.description} variant="info" />
    </section>
  );
};

export default Background;
