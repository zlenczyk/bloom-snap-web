import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface PagerProps {
  page: number;
  totalPages: number;
  onChangePage: (page: number) => void;
}

const Pager = ({ page, totalPages, onChangePage }: PagerProps) => {
  return (
    <Pagination className="mt-6">
      <PaginationContent className="flex justify-center gap-1">
        <PaginationItem>
          <Button
            variant="outline"
            size="sm"
            aria-label="Go to first page"
            onClick={() => onChangePage(1)}
            disabled={page === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
            <span className="hidden sm:inline">First</span>
          </Button>
        </PaginationItem>

        <PaginationItem>
          <Button
            variant="outline"
            size="sm"
            aria-label="Go to previous page"
            onClick={() => onChangePage(page - 1)}
            disabled={page === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Previous</span>
          </Button>
        </PaginationItem>

        <PaginationItem>
          <span className="text-sm text-muted-foreground px-3 flex items-center">
            Page {page} of {totalPages}
          </span>
        </PaginationItem>

        <PaginationItem>
          <Button
            variant="outline"
            size="sm"
            aria-label="Go to next page"
            onClick={() => onChangePage(page + 1)}
            disabled={page === totalPages}
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </PaginationItem>

        <PaginationItem>
          <Button
            variant="outline"
            size="sm"
            aria-label="Go to last page"
            onClick={() => onChangePage(totalPages)}
            disabled={page === totalPages}
          >
            <span className="hidden sm:inline">Last</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default Pager;
