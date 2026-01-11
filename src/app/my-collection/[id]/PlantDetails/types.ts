export enum GrowingMediumEnum {
  Soil = "soil",
  SemiHydroponics = "semi_hydroponics",
  Hydroponics = "hydroponics",
}

export const GROWING_MEDIUM_OPTIONS = {
  [GrowingMediumEnum.Soil]: {
    label: "Soil",
  },
  [GrowingMediumEnum.SemiHydroponics]: {
    label: "Semi-Hydroponics",
  },
  [GrowingMediumEnum.Hydroponics]: {
    label: "Hydroponics",
  },
} as const;

export enum LightExposureEnum {
  MorningSun = "morning_sun_light",
  AfternoonSun = "afternoon_sun_light",
  FullDaySun = "full_day_sun_light",
  LowSun = "low_sun_light",
  Indirect = "indirect_sun_light",
  Artificial = "artificial_light",
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
  NorthFacingNorthernHemisphere = "north_facing_northern_hemisphere",
  SouthFacingNorthernHemisphere = "south_facing_northern_hemisphere",
  EastFacingNorthernHemisphere = "east_facing_northern_hemisphere",
  WestFacingNorthernHemisphere = "west_facing_northern_hemisphere",
  NorthFacingSouthernHemisphere = "north_facing_southern_hemisphere",
  SouthFacingSouthernHemisphere = "south_facing_southern_hemisphere",
  EastFacingSouthernHemisphere = "east_facing_southern_hemisphere",
  WestFacingSouthernHemisphere = "west_facing_southern_hemisphere",
  NoWindow = "no_window",
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

export enum TabEnum {
  Overview = "Overview",
  Environment = "Environment",
  Notes = "Notes",
  Photos = "Photos",
}

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

export enum PhotosFieldsEnum {
  Photos = "photos",
}

export const tabFieldInputs = Object.freeze({
  [TabEnum.Overview]: Object.values(OverviewFieldsEnum),
  [TabEnum.Environment]: Object.values(EnvironmentFieldsEnum),
  [TabEnum.Notes]: Object.values(NotesFieldsEnum),
  [TabEnum.Photos]: Object.values(PhotosFieldsEnum),
});
