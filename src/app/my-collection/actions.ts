// import { auth } from "@/auth";
// import db from "@/lib/db/db";
// import { redirect } from "next/navigation";

// export const getPlants = async () => {
//   const session = await auth();

//   if (!session?.user) redirect("/sign-in");

//   const userId = session?.user?.id;

//   const plants = await db.plant.findMany({
//     where: { userId },
//     orderBy: { createdAt: "desc" },
//     include: {
//       photos: true,
//     },
//   });

//   return plants;
// };

import { auth } from "@/auth";
import db from "@/lib/db/db";
import { redirect } from "next/navigation";
import { SortBy, SortOrder } from "./types";

interface GetCollectionOptions {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
  filters?: {
    petFriendly?: boolean;
    airCleaning?: boolean;
  };
}

export async function getCollection({
  page = 1,
  limit = 12,
  search = "",
  sortBy = "createdAt",
  sortOrder = "desc",
  filters = {},
}: GetCollectionOptions) {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");

  const userId = session.user.id;
  const skip = (page - 1) * limit;

  const searchConditions = search
    ? {
        OR: [
          { commonName: { contains: search, mode: "insensitive" } },
          { nickname: { contains: search, mode: "insensitive" } },
          { genus: { contains: search, mode: "insensitive" } },
          { species: { contains: search, mode: "insensitive" } },
          { roomLocation: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      }
    : {};

  const filterConditions: any = {};
  if (filters.petFriendly) filterConditions.isSafe = true;
  if (filters.airCleaning) filterConditions.isAirPurifying = true;

  const where = {
    userId,
    ...searchConditions,
    ...filterConditions,
  };

  const [plants, totalCount] = await Promise.all([
    db.plant.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
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
    sortOrder,
    filters,
    search,
  };
}
