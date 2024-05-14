"use client";

import { useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

import { useRouter } from "next/navigation";
import { updateListSearchParams } from "@/lib/comic";

export default function CustomPagination({
  total,
  limit,
}: {
  total: number;
  limit: number;
}) {
  const router = useRouter();

  const params = useSearchParams();
  const offset = params.get("offset") || 0;

  const isPreDisable = !offset || Number(offset) === 0;
  const handlePre = () => {
    if (isPreDisable) return;
    const newOffset = Math.max(Number(offset) - limit, 0);
    console.log("newOffset", newOffset);
    const paramsStr = updateListSearchParams(params, { offset: newOffset });
    router.push(`?${paramsStr}`);
  };

  const isNextDisable = Number(offset) >= total;

  console.log("offset", offset);
  console.log("total", total);
  const handleNext = () => {
    if (isNextDisable) return;
    const newOffset = Math.min(Number(offset) + limit, total);
    const paramsStr = updateListSearchParams(params, { offset: newOffset });
    console.log(paramsStr);
    router.push(`?${paramsStr}`);
  };

  return (
    <Pagination className="flex justify-end container">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={`${isPreDisable ? "text-muted-foreground hover:bg-white hover:text-muted-foreground cursor-not-allowed" : "cursor-pointer"}`}
            onClick={handlePre}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            className={`${isNextDisable ? "text-muted-foreground hover:bg-white hover:text-muted-foreground cursor-not-allowed" : "cursor-pointer"}`}
            onClick={handleNext}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
