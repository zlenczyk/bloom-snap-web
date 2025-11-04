"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plant } from "@prisma/client";
import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Pager from "./Pager";
import PlantCard from "./PlantCard";
import SortFilterDropdown from "./SortFilterDropdown";
import { Filters, SortBy } from "./types";

interface CollectionProps {
  plants: Plant[];
  totalPages: number;
}

export default function Collection({ plants, totalPages }: CollectionProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [isHydrated, setIsHydrated] = useState(false);
  const firstSearchRun = useRef(true); // skip first debounce run

  const sortBy = (searchParams.get("sortBy") as SortBy) || "createdAtNewest";

  const filters = {
    petFriendly: searchParams.get("petFriendly") === "true",
    airCleaning: searchParams.get("airCleaning") === "true",
  };

  const page = Number(searchParams.get("page")) || 1;

  const updateParams = (
    newParams: Record<string, string | number | boolean | null>,
    { replace = false }: { replace?: boolean } = {}
  ) => {
    if (!isHydrated) return;

    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === false || value === "") {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    const qs = params.toString();
    const newUrl = `/my-collection${qs ? `?${qs}` : ""}`;
    const currentUrl = window.location.pathname + window.location.search;

    if (newUrl !== currentUrl) {
      replace ? router.replace(newUrl) : router.push(newUrl);
    }
  };

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const hasSortBy = searchParams.has("sortBy");
    const hasPage = searchParams.has("page");

    if (!hasSortBy || !hasPage) {
      updateParams(
        {
          sortBy: hasSortBy
            ? (searchParams.get("sortBy") as SortBy)
            : "createdAtNewest",
          page: hasPage ? searchParams.get("page") || 1 : 1,
        },
        { replace: true }
      );
    }
  }, [isHydrated]);

  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";

    if (urlSearch !== search) {
      setSearch(urlSearch);
    }
  }, [searchParams.toString()]);

  useEffect(() => {
    if (firstSearchRun.current) {
      firstSearchRun.current = false;

      return;
    }

    const t = setTimeout(() => {
      updateParams({ search: search === "" ? null : search, page: 1 });
    }, 400);

    return () => clearTimeout(t);
  }, [search]);

  const toggleFilter = (filterName: Filters) => {
    updateParams({ [filterName]: !filters[filterName], page: 1 });
  };

  const changeSort = (sort: SortBy) => {
    updateParams({ sortBy: sort, page: 1 });
  };

  const changePage = (newPage: number) => {
    updateParams({ page: newPage });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold">My Plant Collection</h2>
        <Button asChild>
          <Link href="/add-plant">Add New Plant</Link>
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search your plants..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <SortFilterDropdown
          sortBy={sortBy}
          filters={filters}
          onChangeSort={changeSort}
          onToggleFilter={toggleFilter}
        />
      </div>

      {plants.length === 0 ? (
        <p className="text-center text-muted-foreground py-10">
          No plants found.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {plants.map((plant) => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>

          {totalPages > 1 && (
            <Pager
              page={page}
              totalPages={totalPages}
              onChangePage={changePage}
            />
          )}
        </>
      )}
    </div>
  );
}
