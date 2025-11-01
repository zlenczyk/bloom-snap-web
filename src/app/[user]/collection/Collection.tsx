"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  SlidersHorizontal,
  Filter,
  AArrowDown,
  AArrowUp,
  CalendarArrowDown,
  CalendarArrowUp,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import PlantCard from "./PlantCard";
import { AddPlantForm } from "@/app/add-plant/schema";
import { Plant } from "@prisma/client";
import Link from "next/link";

interface CollectionProps {
  plants: Plant[];
  totalPages: number;
}

export default function Collection({ plants, totalPages }: CollectionProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [sortBy, setSortBy] = useState(
    searchParams.get("sortBy") || "createdAt"
  );
  const [sortOrder, setSortOrder] = useState(
    searchParams.get("sortOrder") || "desc"
  );
  const [petFriendly, setPetFriendly] = useState(
    searchParams.get("petFriendly") === "true"
  );
  const [airCleaning, setAirCleaning] = useState(
    searchParams.get("airCleaning") === "true"
  );

  const page = Number(searchParams.get("page")) || 1;

  // Update URL params
  const updateParams = (
    newParams: Record<string, string | number | boolean | null>
  ) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === false || value === "") params.delete(key);
      else params.set(key, String(value));
    });

    router.push(`/?${params.toString()}`);
  };

  // Handle search typing with debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      updateParams({ search, page: 1 }); // reset to page 1 when searching
    }, 400);
    return () => clearTimeout(timeout);
  }, [search]);

  const toggleFilter = (key: "petFriendly" | "airCleaning") => {
    if (key === "petFriendly") {
      setPetFriendly((v) => !v);
      updateParams({ petFriendly: !petFriendly, page: 1 });
    } else {
      setAirCleaning((v) => !v);
      updateParams({ airCleaning: !airCleaning, page: 1 });
    }
  };

  const changeSort = (sort: string, order: string) => {
    setSortBy(sort);
    setSortOrder(order);
    updateParams({ sortBy: sort, sortOrder: order });
  };

  const changePage = (newPage: number) => {
    updateParams({ page: newPage });
  };

  return (
    <div className="space-y-6">
      {/* <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold">My Plant Collection</h2>
        <Button>Add New Plant</Button>
      </div> */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold">My Plant Collection</h2>
        <Button asChild>
          <Link href="/add-plant">Add New Plant</Link>
        </Button>
      </div>

      {/* Search + Filters */}
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Sort & Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Sort</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                changeSort("commonName", sortOrder === "asc" ? "desc" : "asc")
              }
            >
              <AArrowUp size={16} className="mr-1 inline" /> Name
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                changeSort("createdAt", sortOrder === "asc" ? "desc" : "asc")
              }
            >
              <CalendarArrowDown size={16} className="mr-1 inline" /> Created
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                changeSort("lastRepotted", sortOrder === "asc" ? "desc" : "asc")
              }
            >
              <CalendarArrowUp size={16} className="mr-1 inline" /> Last
              Repotted
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuLabel>Filter</DropdownMenuLabel>
            <DropdownMenuItem
              className={petFriendly ? "bg-muted" : ""}
              onClick={() => toggleFilter("petFriendly")}
            >
              <Filter className="mr-2 h-4 w-4" />
              Pet Friendly
            </DropdownMenuItem>
            <DropdownMenuItem
              className={airCleaning ? "bg-muted" : ""}
              onClick={() => toggleFilter("airCleaning")}
            >
              <Filter className="mr-2 h-4 w-4" />
              Air Cleaning
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Results */}
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
            <Pagination className="mt-6">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => page > 1 && changePage(page - 1)}
                    aria-disabled={page <= 1}
                  />
                </PaginationItem>
                <PaginationItem>
                  <span className="text-sm text-muted-foreground">
                    Page {page} of {totalPages}
                  </span>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    onClick={() => page < totalPages && changePage(page + 1)}
                    aria-disabled={page >= totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </div>
  );
}
