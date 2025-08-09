"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { LightExposure } from "@/lib/data/light-exposure";
import { WindowDirection } from "@/lib/data/window-direction";
import {
  AArrowDown,
  AArrowUp,
  CalendarArrowDown,
  CalendarArrowUp,
  Filter,
  Leaf,
  Plus,
  Search,
  SlidersHorizontal
} from "lucide-react";
import { useMemo, useState } from "react";
import PlantCard from "./PlantCard";

export type Plant = {
  commonName: string;
  description?: string | null;
  genus?: string | null;
  id: string;
  isAirCleaning?: boolean | null;
  isBlooming?: boolean | null;
  isHealthy?: boolean | null;
  isPetSafe?: boolean | null;
  lastRepotted?: Date | null;
  lightExposure?: `${LightExposure}` | null;
  nickname?: string | null;
  ownedSince?: Date | null;
  pictures?: { url: string }[] | null;
  pottingMix?: string[] | null;
  roomLocation?: string | null;
  soilType?: string | null;
  source?: string | null;
  species?: string | null;
  windowDirection?: `${WindowDirection}` | null;
};

interface CollectionProps {
  plants: Plant[];
}

const Collection = ({ plants = [] }: CollectionProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<
    | "name-asc"
    | "name-desc"
    | "date-oldest"
    | "date-newest"
    | "repotted-oldest"
    | "repotted-newest"
  >("name-asc");

  const [filters, setFilters] = useState({
    needsAttention: false,
    petFriendly: false,
    blooming: false,
    airCleaning: false,
  });

  // const filteredPlants = plants.filter(
  //   (plant) =>
  //     plant.commonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     plant.nickname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     plant.species?.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     plant.genus?.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     plant.roomLocation?.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  const toggleFilter = (
    key: "needsAttention" | "petFriendly" | "blooming" | "airCleaning"
  ) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Apply search + filter + sort
  const filteredPlants = useMemo(() => {
    let result = plants;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();

      result = result.filter(
        (plant) =>
          plant.commonName.toLowerCase().includes(q) ||
          plant.nickname?.toLowerCase().includes(q) ||
          plant.genus?.toLowerCase().includes(q) ||
          plant.species?.toLowerCase().includes(q) ||
          plant.roomLocation?.toLowerCase().includes(q) ||
          plant.description?.toLowerCase().includes(q) ||
          plant.windowDirection?.toLowerCase().includes(q) ||
          plant.lightExposure?.toLowerCase().includes(q)
      );
    }

    if (filters.needsAttention) {
      result = result.filter((plant) => !plant.isHealthy);
    }
    if (filters.petFriendly) {
      result = result.filter((plant) => plant.isPetSafe === true);
    }
    if (filters.blooming) {
      result = result.filter((plant) => plant.isBlooming === true);
    }
    if (filters.airCleaning) {
      result = result.filter((plant) => plant.isAirCleaning === true);
    }

    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.commonName.localeCompare(b.commonName);
        case "name-desc":
          return b.commonName.localeCompare(a.commonName);

        case "date-oldest":
          return (
            (a.ownedSince?.getTime() || 0) - (b.ownedSince?.getTime() || 0)
          );
        case "date-newest":
          return (
            (b.ownedSince?.getTime() || 0) - (a.ownedSince?.getTime() || 0)
          );

        case "repotted-oldest":
          return (
            (a.lastRepotted?.getTime() || 0) - (b.lastRepotted?.getTime() || 0)
          );
        case "repotted-newest":
          return (
            (b.lastRepotted?.getTime() || 0) - (a.lastRepotted?.getTime() || 0)
          );

        default:
          return 0;
      }
    });

    return result;
  }, [plants, searchQuery, filters, sortBy]);


  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="flex items-center text-2xl font-bold">
          <Leaf className="mr-2 h-6 w-6 text-green-600" />
          My Plant Collection
        </h2>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Plant
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search plants by name, nickname, genus, species, location, description, window direction, or light exposure..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              <span>Sort & Filter</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Sort By</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                className={sortBy === "name-asc" ? "bg-muted" : ""}
                onClick={() => setSortBy("name-asc")}
              >
                <AArrowUp size={16} className="mr-1 inline" /> Name (A – Z)
              </DropdownMenuItem>
              <DropdownMenuItem
                className={sortBy === "name-desc" ? "bg-muted" : ""}
                onClick={() => setSortBy("name-desc")}
              >
                <AArrowDown size={16} className="mr-1 inline" /> Name (Z – A)
              </DropdownMenuItem>
              <DropdownMenuItem
                className={sortBy === "date-oldest" ? "bg-muted" : ""}
                onClick={() => setSortBy("date-oldest")}
              >
                <CalendarArrowUp size={16} className="mr-1 inline" /> Acquired
                (newest)
              </DropdownMenuItem>
              <DropdownMenuItem
                className={sortBy === "date-newest" ? "bg-muted" : ""}
                onClick={() => setSortBy("date-newest")}
              >
                <CalendarArrowDown size={16} className="mr-1 inline" /> Acquired
                (oldest)
              </DropdownMenuItem>
              <DropdownMenuItem
                className={sortBy === "repotted-oldest" ? "bg-muted" : ""}
                onClick={() => setSortBy("repotted-oldest")}
              >
                <CalendarArrowUp size={16} className="mr-1 inline" /> Repotted
                (newest)
              </DropdownMenuItem>
              <DropdownMenuItem
                className={sortBy === "repotted-newest" ? "bg-muted" : ""}
                onClick={() => setSortBy("repotted-newest")}
              >
                <CalendarArrowDown size={16} className="mr-1 inline" /> Repotted
                (oldest)
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Filter</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              className={filters.needsAttention ? "bg-muted" : ""}
              onClick={() => toggleFilter("needsAttention")}
            >
              <Filter className="mr-2 h-4 w-4" />
              <span>Needs Attention</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              className={filters.petFriendly ? "bg-muted" : ""}
              onClick={() => toggleFilter("petFriendly")}
            >
              <Filter className="mr-2 h-4 w-4" />
              <span>Pet Friendly</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              className={filters.blooming ? "bg-muted" : ""}
              onClick={() => toggleFilter("blooming")}
            >
              <Filter className="mr-2 h-4 w-4" />
              <span>Blooming</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              className={filters.airCleaning ? "bg-muted" : ""}
              onClick={() => toggleFilter("airCleaning")}
            >
              <Filter className="mr-2 h-4 w-4" />
              <span>Air Cleaning</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {filteredPlants.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <h3 className="text-lg font-medium">No plants found</h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search or add a new plant to your collection.
          </p>
          <Button className="mt-4">Add Plant</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredPlants.map((plant) => (
            <div key={plant.id} className="animate-fade-in">
              <PlantCard plant={plant} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Collection;
