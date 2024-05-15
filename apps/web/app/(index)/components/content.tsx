import ComicList from "@/components/comic-list";
import CustomPagination from "@/components/pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getComicPage } from "@/lib/comic";
import { ComicListParams } from "@copymanga-app/types";

export default async function Content({
  params,
}: {
  params: Partial<ComicListParams>;
}) {
  const p = params ?? {};
  const comicPageData = await getComicPage({
    limit: 20,
    offset: p.offset ?? 0,
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
    </>
  );
}
