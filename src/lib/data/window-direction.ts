export enum WindowDirection {
  NorthFacingNorthernHemisphere = "north-facing-northern-hemisphere",
  SouthFacingNorthernHemisphere = "south-facing-northern-hemisphere",
  EastFacingNorthernHemisphere = "east-facing-northern-hemisphere",
  WestFacingNorthernHemisphere = "west-facing-northern-hemisphere",
  NorthFacingSouthernHemisphere = "north-facing-southern-hemisphere",
  SouthFacingSouthernHemisphere = "south-facing-southern-hemisphere",
  EastFacingSouthernHemisphere = "east-facing-southern-hemisphere",
  WestFacingSouthernHemisphere = "west-facing-southern-hemisphere",
}

export const WINDOW_DIRECTION_OPTIONS = {
  [WindowDirection.NorthFacingNorthernHemisphere]: {
    label: "North-facing (Northern Hemisphere)",
    short: "North-facing",
  },
  [WindowDirection.SouthFacingNorthernHemisphere]: {
    label: "South-facing (Northern Hemisphere)",
    short: "South-facing",
  },
  [WindowDirection.EastFacingNorthernHemisphere]: {
    label: "East-facing (Northern Hemisphere)",
    short: "East-facing",
  },
  [WindowDirection.WestFacingNorthernHemisphere]: {
    label: "West-facing (Northern Hemisphere)",
    short: "West-facing",
  },
  [WindowDirection.NorthFacingSouthernHemisphere]: {
    label: "North-facing (Southern Hemisphere)",
    short: "North-facing",
  },
  [WindowDirection.SouthFacingSouthernHemisphere]: {
    label: "South-facing (Southern Hemisphere)",
    short: "South-facing",
  },
  [WindowDirection.EastFacingSouthernHemisphere]: {
    label: "East-facing (Southern Hemisphere)",
    short: "East-facing",
  },
  [WindowDirection.WestFacingSouthernHemisphere]: {
    label: "West-facing (Southern Hemisphere)",
    short: "West-facing",
  },
} as const;
