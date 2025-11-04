import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AArrowDown,
  AArrowUp,
  CalendarArrowDown,
  CalendarArrowUp,
  Filter,
  SlidersHorizontal,
} from "lucide-react";
import { Filters, SortBy, SortOrder } from "./types";

interface SortFilterDropdownProps {
  sorting: {
    sortBy: SortBy;
    sortOrder: SortOrder;
  };
  filters: {
    petFriendly: boolean;
    airCleaning: boolean;
  };
  onChangeSort: (sortBy: SortBy, sortOrder: SortOrder) => void;
  onToggleFilter: (filterName: Filters) => void;
}

const SortFilterDropdown = ({
  sorting,
  filters,
  onChangeSort,
  onToggleFilter,
}: SortFilterDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 relative">
          <SlidersHorizontal className="h-4 w-4" />
          Sort & Filter
          {(filters.petFriendly || filters.airCleaning) && (
            <span className="absolute top-[-4px] right-[-4px] h-3 w-3 rounded-full bg-green-700" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60">
        <DropdownMenuLabel>Sort</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className={
            sorting.sortBy === "commonName" && sorting.sortOrder === "asc" ? "bg-muted" : ""
          }
          onClick={() => onChangeSort("commonName", "asc")}
        >
          <AArrowUp size={16} className="mr-1 inline" /> Name (A→Z)
        </DropdownMenuItem>
        <DropdownMenuItem
          className={
            sorting.sortBy === "commonName" && sorting.sortOrder === "desc" ? "bg-muted" : ""
          }
          onClick={() => onChangeSort("commonName", "desc")}
        >
          <AArrowDown size={16} className="mr-1 inline" /> Name (Z→A)
        </DropdownMenuItem>
        <DropdownMenuItem
          className={
            sorting.sortBy === "createdAt" && sorting.sortOrder === "asc" ? "bg-muted" : ""
          }
          onClick={() => onChangeSort("createdAt", "asc")}
        >
          <CalendarArrowUp size={16} className="mr-1 inline" /> Created (Oldest)
        </DropdownMenuItem>
        <DropdownMenuItem
          className={
            sorting.sortBy === "createdAt" && sorting.sortOrder === "desc" ? "bg-muted" : ""
          }
          onClick={() => onChangeSort("createdAt", "desc")}
        >
          <CalendarArrowDown size={16} className="mr-1 inline" /> Created
          (Newest)
        </DropdownMenuItem>
        <DropdownMenuItem
          className={
            sorting.sortBy === "lastRepotted" && sorting.sortOrder === "asc" ? "bg-muted" : ""
          }
          onClick={() => onChangeSort("lastRepotted", "asc")}
        >
          <CalendarArrowUp size={16} className="mr-1 inline" /> Last Repotted
          (Oldest)
        </DropdownMenuItem>
        <DropdownMenuItem
          className={
            sorting.sortBy === "lastRepotted" && sorting.sortOrder === "desc" ? "bg-muted" : ""
          }
          onClick={() => onChangeSort("lastRepotted", "desc")}
        >
          <CalendarArrowDown size={16} className="mr-1 inline" /> Last Repotted
          (Newest)
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuLabel>Filter</DropdownMenuLabel>
        <DropdownMenuItem
          className={filters.petFriendly ? "bg-muted" : ""}
          onClick={() => onToggleFilter("petFriendly")}
        >
          <Filter className="mr-2 h-4 w-4" />
          Pet Friendly
        </DropdownMenuItem>
        <DropdownMenuItem
          className={filters.airCleaning ? "bg-muted" : ""}
          onClick={() => onToggleFilter("airCleaning")}
        >
          <Filter className="mr-2 h-4 w-4" />
          Air Cleaning
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortFilterDropdown;
