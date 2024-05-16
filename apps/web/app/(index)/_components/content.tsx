import ComicDetail from "@/components/comic-detail";
import ComicList from "@/components/comic-list";
import CustomPagination from "./pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getComicPage } from "@/lib/comic";
import { IComicListParams } from "@comic-app/types";

export default async function Content({
  params,
}: {
  params: Partial<Omit<IComicListParams, "offset">> & { page?: string };
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
      <ScrollArea className="flex-1 w-full p-2 ">
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
