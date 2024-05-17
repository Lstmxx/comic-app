import { getComicChapterDetail } from "@/lib/comic";
import { ScrollArea } from "@/components/ui/scroll-area";
import ImageContent from "./_components/image-content";
import Controller from "./_components/controller";

export default async function ChapterPage({
  params,
}: {
  params: { id: string; chapterId: string };
}) {
  console.log(params);
  const data = await getComicChapterDetail({
    name: params.id,
    chapterId: params.chapterId,
  });

  const { chapter } = data;
  const { prev, next, contents, words } = chapter;

  const imgList = contents
    .map((content, index) => ({ url: content.url, index }))
    .sort((a, b) => words[a.index] - words[b.index])
    .map((item) => item.url);
  return (
    <div className="flex flex-col h-full py-2">
      <ScrollArea className="flex-1 container mx-auto">
        <ImageContent imgList={imgList} />
      </ScrollArea>
      <Controller prev={prev} next={next} comicId={params.id} />
    </div>
  );
}
