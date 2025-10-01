export enum GrowingMediumEnum {
  Soil = "soil",
  SemiHydroponics = "semi-hydroponics",
  Hydroponics = "hydroponics",
}

export enum LightExposureEnum {
  MorningSun = "morning-sun-light",
  AfternoonSun = "afternoon-sun-light",
  FullDaySun = "full-day-sun-light",
  LowSun = "low-sun-light",
  Indirect = "indirect-sun-light",
  Artificial = "artificial-light",
}

export const LIGHT_EXPOSURE_OPTIONS = {
  [LightExposureEnum.MorningSun]: {
    label: "Morning sun",
    short: "Morning",
  },
  [LightExposureEnum.AfternoonSun]: {
    label: "Afternoon sun",
    short: "Afternoon",
  },
  [LightExposureEnum.FullDaySun]: {
    label: "Full-day sun",
    short: "Full-day",
  },
  [LightExposureEnum.LowSun]: {
    label: "Low sunlight",
    short: "Low",
  },
  [LightExposureEnum.Indirect]: {
    label: "Indirect light",
    short: "Indirect",
  },
  [LightExposureEnum.Artificial]: {
    label: "Artificial light",
    short: "Artificial",
  },
} as const;

export enum WindowDirectionEnum {
  NorthFacingNorthernHemisphere = "north-facing-northern-hemisphere",
  SouthFacingNorthernHemisphere = "south-facing-northern-hemisphere",
  EastFacingNorthernHemisphere = "east-facing-northern-hemisphere",
  WestFacingNorthernHemisphere = "west-facing-northern-hemisphere",
  NorthFacingSouthernHemisphere = "north-facing-southern-hemisphere",
  SouthFacingSouthernHemisphere = "south-facing-southern-hemisphere",
  EastFacingSouthernHemisphere = "east-facing-southern-hemisphere",
  WestFacingSouthernHemisphere = "west-facing-southern-hemisphere",
  NoWindow = "no-window",
}

export const WINDOW_DIRECTION_OPTIONS = {
  [WindowDirectionEnum.NorthFacingNorthernHemisphere]: {
    label: "North-facing (Northern Hemisphere)",
    short: "North-facing",
  },
  [WindowDirectionEnum.SouthFacingNorthernHemisphere]: {
    label: "South-facing (Northern Hemisphere)",
    short: "South-facing",
  },
  [WindowDirectionEnum.EastFacingNorthernHemisphere]: {
    label: "East-facing (Northern Hemisphere)",
    short: "East-facing",
  },
  [WindowDirectionEnum.WestFacingNorthernHemisphere]: {
    label: "West-facing (Northern Hemisphere)",
    short: "West-facing",
  },
  [WindowDirectionEnum.NorthFacingSouthernHemisphere]: {
    label: "North-facing (Southern Hemisphere)",
    short: "North-facing",
  },
  [WindowDirectionEnum.SouthFacingSouthernHemisphere]: {
    label: "South-facing (Southern Hemisphere)",
    short: "South-facing",
  },
  [WindowDirectionEnum.EastFacingSouthernHemisphere]: {
    label: "East-facing (Southern Hemisphere)",
    short: "East-facing",
  },
  [WindowDirectionEnum.WestFacingSouthernHemisphere]: {
    label: "West-facing (Southern Hemisphere)",
    short: "West-facing",
  },
  [WindowDirectionEnum.NoWindow]: {
    label: "No window",
    short: "No window",
  },
} as const;

export enum isAirPurifyingEnum {
  Yes = "Yes",
  No = "No",
}

export enum isSafeEnum {
  Yes = "Yes",
  No = "No",
}

// Enum for tabs
export enum TabEnum {
  Overview = "overview",
  Environment = "environment",
  Notes = "notes",
}

// Enum for fields (optional, for strong typing)
export enum OverviewFieldsEnum {
  CommonName = "commonName",
  Species = "species",
  Genus = "genus",
  Nickname = "nickname",
  Source = "source",
  OwnedSince = "ownedSince",
  IsAirPurifying = "isAirPurifying",
  IsSafe = "isSafe",
  Description = "description",
}

export enum EnvironmentFieldsEnum {
  CurrentHeight = "currentHeight",
  CurrentPotSize = "currentPotSize",
  LastRepotted = "lastRepotted",
  Humidity = "humidity",
  Temperature = "temperature",
  LightExposure = "lightExposure",
  WindowDirection = "windowDirection",
  RoomLocation = "roomLocation",
  GrowingMedium = "growingMedium",
  PottingMix = "pottingMix",
}

export enum NotesFieldsEnum {
  WateringNotes = "wateringNotes",
  MistingNotes = "mistingNotes",
  LeafCleaningNotes = "leafCleaningNotes",
  FertilizingNotes = "fertilizingNotes",
  AdditionalNotes = "additionalNotes",
}

// Mapping object for easier access
export const tabFieldInputs = Object.freeze({
  [TabEnum.Overview]: Object.values(OverviewFieldsEnum),
  [TabEnum.Environment]: Object.values(EnvironmentFieldsEnum),
  [TabEnum.Notes]: Object.values(NotesFieldsEnum),
});
