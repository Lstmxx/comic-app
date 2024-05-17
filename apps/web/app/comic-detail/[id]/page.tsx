import CustomImage from "@/components/custom-image";
import { Button } from "@/components/ui/button";
import { getComicDetail } from "@/lib/comic";
import RowTag from "./_components/row-tag";
import Chapter from "./_components/chapter";

export default async function ComicDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getComicDetail(params.id);
  const { theme, status, region } = data.comic;
  const themeTags: {
    id: string;
    name: string;
    type: "region" | "theme" | "author" | "status";
  }[] = [
    {
      id: status.value.toString(),
      name: status.display,
      type: "status",
    },
    {
      id: region.value.toString(),
      name: region.display,
      type: "region",
    },
  ];

  theme.forEach((tag) => {
    themeTags.push({
      id: tag.path_word,
      name: tag.name,
      type: "theme",
    });
  });
  return (
    <div className="flex flex-col container mx-auto py-4 gap-4">
      <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4 ">
        <div className="w-[300px] sm:flex-1">
          <CustomImage
            className="w-full pb-[128%]"
            imgProps={{
              src: data?.comic.cover,
              alt: data?.comic.alias,
              className: "rounded-lg object-cover",
              loading: "lazy",
            }}
          />
        </div>
        <div className="flex flex-1 sm:flex-[2] flex-col gap-2">
          <h2 className="text-lg font-semibold">{data.comic.name}</h2>
          <p className="text-sm text-muted-foreground">{data.comic.alias}</p>
          <RowTag
            label="作者"
            tags={data.comic.author.map((author) => ({
              id: author.path_word,
              name: author.name,
              type: "author",
            }))}
          />
          <RowTag tags={themeTags} />
          <p className="text-sm text-muted-foreground">
            最后更新时间：{data.comic.datetime_updated}
          </p>
          <p className="text-sm text-muted-foreground">{data.comic.brief}</p>
        </div>
      </div>
      <Chapter groups={data.groups} comicName={data.comic.path_word} />
    </div>
  );
}
