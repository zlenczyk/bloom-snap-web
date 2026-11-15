import { auth } from "@/auth";
import db from "@/lib/db";
import { getCollection } from "./actions";
import Collection from "./Collection";
import DemoWelcome from "./DemoWelcome";
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

  const session = await auth();

  // Demo visitors get a one-time welcome that points at the plant with the
  // longest care timeline.
  const featuredPlant = session?.user?.isDemo
    ? await db.plant.findFirst({
        where: { userId: session.user.id },
        orderBy: { TimelineEvent: { _count: "desc" } },
        select: { id: true, commonName: true },
      })
    : null;

  return (
    <div className="layout-padding">
      <Collection plants={plants} totalPages={totalPages} />

      {session?.user?.isDemo && (
        <DemoWelcome featuredPlant={featuredPlant} userId={session.user.id} />
      )}
    </div>
  );
}
