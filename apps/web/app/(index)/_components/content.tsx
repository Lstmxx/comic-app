import ComicDetail from "@/components/comic-detail";
import ComicList from "@/components/comic-list";
import CustomPagination from "./pagination";
import ScrollArea from ".//scroll-area";
import { getComicPage } from "@/lib/comic";
import { IComicPageParams } from "@comic-app/types";
import { useRef } from "react";

export default async function Content({
  params,
}: {
  params: Partial<Omit<IComicPageParams, "offset">> & { page?: string };
}) {
  const LIMIT = 20;
  const p = params ?? {};
  const comicPageData = await getComicPage({
    limit: LIMIT,
    offset: (Number(p.page || "1") - 1) * LIMIT,
    ordering: "-datetime_updated",
    theme: p.theme ?? "",
    _update: false,
    top: p.top ?? "",
  });

  return (
    <>
      <ScrollArea>
        <ComicList list={comicPageData.list} />
      </ScrollArea>
      <CustomPagination
        total={comicPageData.total}
        limit={comicPageData.limit}
      />
      <ComicDetail />
    </>
  );
}
