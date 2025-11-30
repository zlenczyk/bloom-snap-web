import { Separator } from "@/components/ui/separator";
import { formatDateForLocalDisplay } from "@/lib/utils";
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

      <div
        className="
          grid
          grid-cols-[max-content,1fr]
          gap-y-3
          gap-x-6
          items-start
        "
      >
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-gray-500" />
          <label className="text-sm font-medium text-gray-500">Source</label>
        </div>
        <div className="min-w-0 break-words">
          <ValueDisplay value={background.source} variant="info" />
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <label className="text-sm font-medium text-gray-500">
            {background.ownedSince
              ? background.ownedSince >= new Date()
                ? "Planned Ownership"
                : "Owned Since"
              : "Ownership Date"}
          </label>
        </div>
        <div className="min-w-0 break-words">
          <ValueDisplay
            value={formatDateForLocalDisplay(background.ownedSince)}
            variant="info"
          />
        </div>

        <div className="col-span-2 my-2">
          <Separator />
        </div>

        <div className="flex items-center gap-2 col-span-2">
          <BookOpenText className="h-4 w-4 text-gray-500" />
          <label className="text-sm font-medium text-gray-500">
            Description
          </label>
        </div>

        <div className="col-span-2 min-w-0 break-words">
          <ValueDisplay value={background.description} variant="info" />
        </div>
      </div>
    </section>
  );
};

export default Background;
