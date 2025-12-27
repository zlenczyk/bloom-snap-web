import { formatDateForLocalDisplay } from "@/lib/utils";
import { Calendar, Diameter, Ruler, TrendingUp } from "lucide-react";
import ValueDisplay from "./ValueDisplay";

interface GrowthProps {
  growth: {
    currentHeight: string | null;
    currentPotSize: string | null;
    lastRepotted: Date | null;
  };
}

const Growth = ({ growth }: GrowthProps) => {
  return (
    <section
      id="growth"
      className="sm:rounded-xl p-6 shadow-md col-span-full bg-white"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-emerald-100">
          <TrendingUp className="h-5 w-5 text-emerald-700" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Growth</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-gradient-to-br from-emerald-300/50 to-emerald-50 text-center shadow-md">
          <Ruler className="h-5 w-5 text-emerald-800 mb-1" />
          <p className="text-sm text-gray-600">Height</p>
          <ValueDisplay value={growth.currentHeight} variant="stats" />
        </div>

        <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-gradient-to-br from-amber-200/50 to-amber-50 text-center shadow-md">
          <Diameter className="h-5 w-5 text-amber-700 mb-1" />
          <p className="text-sm text-gray-600">Pot Diameter</p>
          <ValueDisplay value={growth.currentPotSize} variant="stats" />
        </div>

        <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-gradient-to-br from-blue-200/50 to-blue-50 text-center shadow-md">
          <Calendar className="h-5 w-5 text-blue-700 mb-1" />
          <p className="text-sm text-gray-600">
            {growth.lastRepotted
              ? growth.lastRepotted >= new Date()
                ? "Next Planned Repot"
                : "Last Repotted"
              : "Repot Date"}
          </p>
          <ValueDisplay
            value={formatDateForLocalDisplay(growth.lastRepotted)}
            variant="stats"
          />
        </div>
      </div>
    </section>
  );
};

export default Growth;
