
import { auth } from "@/auth";
import db from "@/lib/db/db";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import { SortBy, SortByField, SortOrder } from "./types";

const sortMap: Record<
  SortBy,
  {
    field: SortByField;
    order: SortOrder;
  }
> = {
  createdAtNewest: { field: "createdAt", order: "desc" },
  createdAtOldest: { field: "createdAt", order: "asc" },
  commonNameAsc: { field: "commonName", order: "asc" },
  commonNameDesc: { field: "commonName", order: "desc" },
  lastRepottedNewest: { field: "lastRepotted", order: "desc" },
  lastRepottedOldest: { field: "lastRepotted", order: "asc" },
};

interface GetCollectionOptions {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: SortBy;
  filters?: {
    petFriendly?: boolean;
    airCleaning?: boolean;
  };
}

export async function getCollection({
  page = 1,
  limit = 12,
  search = "",
  sortBy = "createdAtNewest",
  filters = {},
}: GetCollectionOptions) {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");

  const userId = session.user.id;
  const skip = (page - 1) * limit;

  const where: Prisma.PlantWhereInput = {
    userId,
  };

  if (search) {
    where.OR = [
      { commonName: { contains: search, mode: "insensitive" } },
      { nickname: { contains: search, mode: "insensitive" } },
      { genus: { contains: search, mode: "insensitive" } },
      { species: { contains: search, mode: "insensitive" } },
      { roomLocation: { contains: search, mode: "insensitive" } },
    ];
  }

  if (filters.petFriendly) where.isSafe = true;
  if (filters.airCleaning) where.isAirPurifying = true;

  const sort = sortMap[sortBy] || sortMap["createdAtNewest"];

  const [plants, totalCount] = await Promise.all([
    db.plant.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sort.field]: sort.order },
      include: {
        photos: { take: 1 },
      },
    }),
    db.plant.count({ where }),
  ]);

  return {
    plants,
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
    page,
    sortBy,
    filters,
    search,
  };
}
