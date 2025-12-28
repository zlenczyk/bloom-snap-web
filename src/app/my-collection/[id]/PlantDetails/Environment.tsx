import {
  GROWING_MEDIUM_OPTIONS,
  GrowingMediumEnum,
  LIGHT_EXPOSURE_OPTIONS,
  LightExposureEnum,
  WINDOW_DIRECTION_OPTIONS,
  WindowDirectionEnum,
} from "@/app/my-collection/[id]/PlantDetails/types";
import {
  Cloud,
  Compass,
  MapPin,
  Sun,
  Thermometer,
  ThermometerSun,
} from "lucide-react";
import GrowingMedium from "./GrowingMedium";
import ValueDisplay from "./ValueDisplay";

interface EnvironmentProps {
  environment: {
    humidity: string | null;
    temperature: string | null;
    lightExposure: `${LightExposureEnum}` | null;
    windowDirection: `${WindowDirectionEnum}` | null;
    roomLocation: string | null;
    growingMedium: `${GrowingMediumEnum}` | null;
    pottingMix: string[];
  };
}

const Environment = ({ environment }: EnvironmentProps) => {
  return (
    <section
      id="environmental-conditions"
      className="sm:rounded-xl p-4 sm:p-6 shadow-md col-span-full bg-white"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-cyan-100">
          <ThermometerSun className="h-5 w-5 text-cyan-700" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Environment</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-gradient-to-br from-cyan-400/40 to-cyan-50 text-center shadow-md min-w-0 w-full">
          <Cloud className="h-5 w-5 text-cyan-800 mb-1" />
          <p className="text-sm text-gray-600">Humidity</p>
          <div className="w-full">
            <ValueDisplay value={environment.humidity} variant="stats" />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-gradient-to-br from-rose-400/40 to-rose-50 text-center shadow-md min-w-0 w-full">
          <Thermometer className="h-5 w-5 text-rose-800 mb-1" />
          <p className="text-sm text-gray-600">Temperature</p>
          <div className="w-full">
            <ValueDisplay value={environment.temperature} variant="stats" />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-3 rounded-lg text-center shadow-md bg-gradient-to-br from-amber-300/60 to-amber-50 min-w-0 w-full">
          <Sun className="h-5 w-5 text-amber-800 mb-1" />
          <p className="text-sm text-gray-600">Light</p>
          <div className="w-full">
            <ValueDisplay
              value={
                environment.lightExposure
                  ? LIGHT_EXPOSURE_OPTIONS[environment.lightExposure]?.label
                  : null
              }
              variant="stats"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-4 h-full">
          <div className="flex-1 flex flex-col items-center justify-center p-3 rounded-lg bg-gradient-to-br from-blue-400/40 to-blue-50 text-center shadow-md min-w-0 w-full">
            <Compass className="h-5 w-5 text-blue-800 mb-1" />
            <p className="text-sm text-gray-600">Window</p>
            <div className="w-full">
              <ValueDisplay
                value={
                  environment.windowDirection
                    ? WINDOW_DIRECTION_OPTIONS[environment.windowDirection]
                        ?.label
                    : null
                }
                variant="stats"
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center p-3 rounded-lg bg-gradient-to-br from-orange-600/20 to-orange-50 text-center shadow-md min-w-0 w-full">
            <MapPin className="h-5 w-5 text-orange-800 mb-1" />
            <p className="text-sm text-gray-600">Location</p>
            <div className="w-full">
              <ValueDisplay value={environment.roomLocation} variant="stats" />
            </div>
          </div>
        </div>

        <div className="min-w-0 w-full">
          <GrowingMedium
            mediumType={
              environment.growingMedium
                ? GROWING_MEDIUM_OPTIONS[environment.growingMedium]?.label
                : null
            }
            items={environment.pottingMix}
          />
        </div>
      </div>
    </section>
  );
};

export default Environment;
