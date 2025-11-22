import { Plant, PlantPhoto } from "@prisma/client";

export type SortBy =
  | "createdAtNewest"
  | "createdAtOldest"
  | "commonNameAsc"
  | "commonNameDesc"
  | "lastRepottedNewest"
  | "lastRepottedOldest";

export type SortByField = "commonName" | "createdAt" | "lastRepotted";

export type SortOrder = "asc" | "desc";

export type Filters = "petFriendly" | "airCleaning";

export type PlantWithPhotos = Plant & { photos: PlantPhoto[] };
