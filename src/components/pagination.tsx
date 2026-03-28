"use client";

import { useSearchParams } from "next/navigation";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
} from "@/components/ui/pagination";

import { CustomLink } from "./custom-link";
import { Button } from "./ui/button";

type JobPaginationProps = {
  totalPages: number;
};

export function JobPagination({ totalPages }: JobPaginationProps) {
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  if (totalPages <= 1) return null;

  const createPageLink = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `?${params.toString()}`;
  };

  return (
    <Pagination className="mt-10">
      <PaginationContent>
        {/* Previous */}
        <Button asChild variant="outline" size="sm">
          <CustomLink
            href={createPageLink(currentPage - 1)}
            className={
              currentPage === 1 ? "pointer-events-none opacity-50" : ""
            }
          >
            Previous
          </CustomLink>
        </Button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1 mx-1">
          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1;
            const isActive = page === currentPage;

            if (
              page !== 1 &&
              page !== totalPages &&
              Math.abs(page - currentPage) > 1
            ) {
              if (page === currentPage - 2 || page === currentPage + 2) {
                return <PaginationEllipsis key={page} />;
              }
              return null;
            }

            return (
              <Button
                key={page}
                asChild
                variant="outline"
                size="sm"
                className={isActive ? "pointer-events-none text-brand" : ""}
              >
                <CustomLink
                  href={isActive ? "#" : createPageLink(page)}
                  aria-current={isActive ? "page" : undefined}
                >
                  {page}
                </CustomLink>
              </Button>
            );
          })}
        </div>

        {/* Next */}
        <Button asChild variant="outline" size="sm">
          <CustomLink
            href={createPageLink(currentPage + 1)}
            className={
              currentPage === totalPages ? "pointer-events-none opacity-50" : ""
            }
          >
            Next
          </CustomLink>
        </Button>
      </PaginationContent>
    </Pagination>
  );
}
