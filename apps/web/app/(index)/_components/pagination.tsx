"use client";

import CustomPagination from "@/components/pagination";
import { updateListSearchParams } from "@/lib/comic";
import { useRouter, useSearchParams } from "next/navigation";
import { useScrollState } from "../_hooks/use-scroll-store";

export default function Pagination({
  total,
  limit,
}: {
  total: number;
  limit: number;
}) {
  const router = useRouter();
  const params = useSearchParams();

  const store = useScrollState();
  const handleRoute = (newPage: number) => {
    const paramsStr = updateListSearchParams(params, {
      page: newPage.toString(),
    });
    router.push(`?${paramsStr}`);
    store.scrollToTop();
  };
  return CustomPagination({
    total,
    limit,
    defaultPage: Number(params.get("page") || 1),
    handlePre: handleRoute,
    handleNext: handleRoute,
    handleJump: handleRoute,
  });
}
