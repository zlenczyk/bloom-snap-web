type Errors = {
  commonName?: string[];
  species?: string[];
  genus?: string[];
  nickname?: string[];
  currentHeight?: string[];
  currentPotSize?: string[];
  wateringNotes?: string[];
  mistingNotes?: string[];
  leafCleaningNotes?: string[];
  fertilizingNotes?: string[];
  additionalNotes?: string[];
  humidity?: string[];
  temperature?: string[];
  description?: string[];
  source?: string[];
  ownedSince?: string[];
  lastRepotted?: string[];
  roomLocation?: string[];
  isSafe?: string[];
  isAirPurifying?: string[];
  windowDirection?: string[];
  lightExposure?: string[];
  growingMedium?: string[];
  pottingMix?: string[];
  photos?: string[];
};

export type PlantFormState = {
  message?: string;
  success?: boolean;
  errors?: Errors;
};
