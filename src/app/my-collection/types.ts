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
