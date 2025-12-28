"use server";

import { auth } from "@/auth";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import createPlantPhotoAbsoluteUrls from "./[id]/actions/createPlantPhotoAbsoluteUrls";
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
  ownedSinceNewest: { field: "ownedSince", order: "desc" },
  ownedSinceOldest: { field: "ownedSince", order: "asc" },
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

  const orderBy: Prisma.PlantOrderByWithRelationInput[] = [];

  if (["lastRepotted", "ownedSince"].includes(sort.field)) {
    orderBy.push({ [sort.field]: { sort: sort.order, nulls: "last" } });
  } else {
    orderBy.push({ [sort.field]: sort.order });
  }

  if (sort.field !== "createdAt") {
    orderBy.push({ createdAt: "desc" });
  }

  const [plants, totalCount] = await Promise.all([
    db.plant.findMany({
      where,
      skip,
      take: limit,
      orderBy: orderBy,
      include: {
        photos: true,
      },
    }),
    db.plant.count({ where }),
  ]);

  const plantsWithPhotoLinks = await Promise.all(
    plants.map(async (plant) => {
      return await createPlantPhotoAbsoluteUrls(plant);
    })
  );

  return {
    plants: plantsWithPhotoLinks,
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
    page,
    sortBy,
    filters,
    search,
  };
}
