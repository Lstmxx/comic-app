import ComicDetail from "@/components/comic-detail";
import ComicList from "@/components/comic-list";
import CustomPagination from "./pagination";
import ScrollArea from ".//scroll-area";
import { getComicPage } from "@/lib/comic";
import { IComicPageParams, ComicList as IComicList } from "@comic-app/types";
import ErrorTips from "@/components/error-tips";

export default async function Content({
  params,
}: {
  params: Partial<Omit<IComicPageParams, "offset">> & { page?: string };
}) {
  const LIMIT = 20;
  const p = params ?? {};
  let comicPageData: IComicList = {
    list: [],
    total: 0,
    limit: LIMIT,
    offset: 0,
  };
  let errorMsg = "";
  try {
    comicPageData = await getComicPage({
      limit: LIMIT,
      offset: (Number(p.page || "1") - 1) * LIMIT,
      ordering: "-datetime_updated",
      theme: p.theme ?? "",
      _update: false,
      top: p.top ?? "",
    });
  } catch (error) {
    errorMsg = "漫画列表获取失败";
  }

  console.log("comicPageData", comicPageData);

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
      {errorMsg ? <ErrorTips msg={errorMsg} /> : ""}
    </>
  );
}
