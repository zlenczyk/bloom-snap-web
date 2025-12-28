import { Plant, PlantPhoto } from "@prisma/client";

export type SortBy =
  | "createdAtNewest"
  | "createdAtOldest"
  | "commonNameAsc"
  | "commonNameDesc"
  | "lastRepottedNewest"
  | "lastRepottedOldest"
  | "ownedSinceNewest"
  | "ownedSinceOldest";

export type SortByField =
  | "createdAt"
  | "commonName"
  | "lastRepotted"
  | "ownedSince";

export type SortOrder = "asc" | "desc";

export type Filters = "petFriendly" | "airCleaning";

export type PlantWithPhotos = Plant & { photos: PlantPhoto[] };

export type PlantAbsolutePhotoUrl = PlantPhoto & { absoluteUrl: string };

export type PlantWithAbsolutePhotoUrls = Plant & {
  photos: PlantAbsolutePhotoUrl[];
};
