import { getCollection } from "./actions";
import Collection from "./Collection";
import { SortBy, SortOrder } from "./types";

export interface HomePageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    sortBy?: SortBy;
    sortOrder?: SortOrder;
    petFriendly?: string;
    airCleaning?: string;
  }>;
}

export default async function Home({
  searchParams: searchParamsPromise,
}: HomePageProps) {
  const searchParams = await searchParamsPromise;
  const page = searchParams.page ? Number(searchParams.page) : 1;
  const search = searchParams.search || "";
  const sortBy: SortBy = searchParams.sortBy || "createdAtNewest";
  const petFriendly = searchParams.petFriendly === "true";
  const airCleaning = searchParams.airCleaning === "true";

  const { plants, totalPages } = await getCollection({
    page,
    search,
    sortBy,
    filters: {
      petFriendly,
      airCleaning,
    },
  });

  return (
    <main className="container py-8 px-6 mx-auto max-w-7xl">
      <Collection plants={plants} totalPages={totalPages} />
    </main>
  );
}
