import { Calendar, Diameter, Ruler, TrendingUp } from "lucide-react";

const Growth = () => {
  return (
    <section
      id="growth"
      className="rounded-xl p-6 shadow-md col-span-full bg-white"
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
          <p className="text-lg font-semibold text-gray-900">30 cm</p>
        </div>

        <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-gradient-to-br from-amber-200/50 to-amber-50 text-center shadow-md">
          <Diameter className="h-5 w-5 text-amber-700 mb-1" />
          <p className="text-sm text-gray-600">Pot Diameter</p>
          <p className="text-lg font-semibold text-gray-900">15 cm</p>
        </div>

        <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-gradient-to-br from-blue-200/50 to-blue-50 text-center shadow-md">
          <Calendar className="h-5 w-5 text-blue-700 mb-1" />
          <p className="text-sm text-gray-600">Last Repotted</p>
          <p className="text-lg font-semibold text-gray-900">15/07/2022</p>
        </div>
      </div>
    </section>
  );
};

export default Growth;
