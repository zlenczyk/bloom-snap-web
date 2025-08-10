export enum LightExposure {
  MorningSun = "morning-sun-light",
  AfternoonSun = "afternoon-sun-light",
  FullDaySun = "full-day-sun-light",
  LowSun = "low-sun-light",
  Indirect = "indirect-sun-light",
  Artificial = "artificial-light",
}

export const LIGHT_EXPOSURE_OPTIONS = {
  [LightExposure.MorningSun]: {
    label: "Morning sun",
    short: "Morning",
  },
  [LightExposure.AfternoonSun]: {
    label: "Afternoon sun",
    short: "Afternoon",
  },
  [LightExposure.FullDaySun]: {
    label: "Full-day sun",
    short: "Full-day",
  },
  [LightExposure.LowSun]: {
    label: "Low sunlight",
    short: "Low",
  },
  [LightExposure.Indirect]: {
    label: "Indirect light",
    short: "Indirect",
  },
  [LightExposure.Artificial]: {
    label: "Artificial light",
    short: "Artificial",
  },
} as const;
