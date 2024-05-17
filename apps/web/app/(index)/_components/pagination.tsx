"use client";

import CustomPagination from "@/components/pagination";
import { updateListSearchParams } from "@/lib/comic";
import { useRouter, useSearchParams } from "next/navigation";

export default function Pagination({
  total,
  limit,
}: {
  total: number;
  limit: number;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const handleRoute = (newPage: number) => {
    const paramsStr = updateListSearchParams(params, {
      page: newPage.toString(),
    });
    router.push(`?${paramsStr}`);
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
