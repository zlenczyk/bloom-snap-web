import {
  Cloud,
  Compass,
  MapPin,
  Sun,
  Thermometer,
  ThermometerSun,
} from "lucide-react";

const Environment = () => {
  return (
    <section
      id="environmental-conditions"
      className="rounded-xl p-6 shadow-md col-span-full bg-gradient-to-br from-blue-100 to-slate-50"
    >
      <div className="flex items-center gap-3 mb-4">
        <ThermometerSun className="h-6 w-6 text-cyan-800" />
        <h2 className="text-xl font-semibold text-gray-900">Environment</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
        <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-gradient-to-br from-cyan-400/40 to-cyan-50 text-center shadow-md">
          <Cloud className="h-5 w-5 text-cyan-800 mb-1" />
          <p className="text-sm text-gray-600">Humidity</p>
          <p className="text-lg font-semibold text-gray-900">60%</p>
        </div>

        <div className="flex flex-col items-center justify-center  p-3 rounded-lg inset-0 bg-gradient-to-br from-red-300/60 to-red-50 text-center shadow-md">
          <Thermometer className="h-5 w-5 text-red-700 mb-1" />
          <p className="text-sm  text-gray-600">Temperature</p>
          <p className="text-lg font-semibold text-gray-900">22°C</p>
        </div>

        <div className="flex flex-col items-center justify-center p-3 rounded-lg text-center shadow-md bg-gradient-to-br from-yellow-400/70 to-yellow-50">
          <Sun className="h-5 w-5 text-yellow-800 mb-1" />
          <p className="text-sm  text-gray-600">Light</p>
          <p className="text-lg font-semibold text-gray-900">Bright Indirect</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex flex-col items-center justify-center p-3 rounded-lg  bg-gradient-to-br from-blue-300/60 to-blue-50 text-center shadow-md">
          <Compass className="h-5 w-5 text-blue-800 mb-1" />
          <p className="text-sm  text-gray-600">Window</p>
          <p className="text-lg font-semibold text-gray-900">East-facing</p>
        </div>

        <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-gradient-to-br from-zinc-300 to-zinc-50 text-center shadow-md">
          <MapPin className="h-5 w-5 text-zinc-700 mb-1" />
          <p className="text-sm  text-gray-600">Location</p>
          <p className="text-lg font-semibold text-gray-900">Living Room</p>
        </div>
      </div>
    </section>
  );
};

export default Environment;
