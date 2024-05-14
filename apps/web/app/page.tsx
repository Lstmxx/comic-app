import { PageProps } from "@/.next/types/app/page";
import ComicList from "@/components/comic-list";
import FilterTag from "@/components/filter-tag";
import CustomPagination from "@/components/pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getComicPage } from "@/lib/comic";
import { getAllTag } from "@/lib/tag";
import { ComicListParams } from "@copymanga-app/types";

export default async function Home({
  searchParams,
}: {
  searchParams: Partial<ComicListParams>;
}) {
  console.log("env", process.env.NEXT_PUBLIC_SERVER_API);
  console.log("searchParams", searchParams);
  const params = searchParams ?? {};
  const comicPageData = await getComicPage({
    limit: 20,
    offset: params.offset ?? 0,
    ordering: params.ordering ?? "-datetime_updated",
    theme: params.theme ?? "",
    _update: false,
    top: params.top ?? "",
  });

  const tags = await getAllTag();
  return (
    <div className="flex flex-col h-full w-full">
      <div className="px-4">
        <FilterTag tags={tags} />
      </div>
      <ScrollArea className="flex-1 w-full p-2 ">
        <ComicList list={comicPageData.list} />
      </ScrollArea>
      <CustomPagination
        total={comicPageData.total}
        limit={comicPageData.limit}
      />
    </div>
  );
}
