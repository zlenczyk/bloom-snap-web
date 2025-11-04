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
import { Filters, SortBy } from "./types";

interface SortFilterDropdownProps {
  sortBy: SortBy;
  filters: {
    petFriendly: boolean;
    airCleaning: boolean;
  };
  onChangeSort: (sort: SortBy) => void;
  onToggleFilter: (filterName: Filters) => void;
}

const SortFilterDropdown = ({
  sortBy,
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
          className={sortBy === "commonNameAsc" ? "bg-muted" : ""}
          onClick={() => onChangeSort("commonNameAsc")}
        >
          <AArrowUp size={16} className="mr-1 inline" /> Name (A→Z)
        </DropdownMenuItem>
        <DropdownMenuItem
          className={sortBy === "commonNameDesc" ? "bg-muted" : ""}
          onClick={() => onChangeSort("commonNameDesc")}
        >
          <AArrowDown size={16} className="mr-1 inline" /> Name (Z→A)
        </DropdownMenuItem>
        <DropdownMenuItem
          className={sortBy === "createdAtOldest" ? "bg-muted" : ""}
          onClick={() => onChangeSort("createdAtOldest")}
        >
          <CalendarArrowUp size={16} className="mr-1 inline" /> Created (Oldest)
        </DropdownMenuItem>
        <DropdownMenuItem
          className={sortBy === "createdAtNewest" ? "bg-muted" : ""}
          onClick={() => onChangeSort("createdAtNewest")}
        >
          <CalendarArrowDown size={16} className="mr-1 inline" /> Created
          (Newest)
        </DropdownMenuItem>
        <DropdownMenuItem
          className={sortBy === "lastRepottedOldest" ? "bg-muted" : ""}
          onClick={() => onChangeSort("lastRepottedOldest")}
        >
          <CalendarArrowUp size={16} className="mr-1 inline" /> Last Repotted
          (Oldest)
        </DropdownMenuItem>
        <DropdownMenuItem
          className={sortBy === "lastRepottedNewest" ? "bg-muted" : ""}
          onClick={() => onChangeSort("lastRepottedNewest")}
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
