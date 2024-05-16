"use client";
import { useDrawerState } from "@/store/use-drawer-state";
import { Author as IAuthor, ComicItem as IComicItem } from "@comic-app/types";
import { MouseEventHandler } from "react";
import CustomImage from "./custom-image";
import { useRouter } from "next/navigation";

const Author = ({ data }: { data: IAuthor }) => {
  const { openAuthorDetail } = useDrawerState();
  const handleSearchAuthor: MouseEventHandler<HTMLSpanElement> = (event) => {
    event.stopPropagation();
    openAuthorDetail(data.path_word);
    console.log(data.path_word);
  };
  return (
    <p
      className="text-muted-foreground transition hover:bg-gray-200 px-2 py-1 rounded-sm text-wrap"
      onClick={handleSearchAuthor}
    >
      {data.name}
    </p>
  );
};

export const ComicItm = ({ data }: { data: IComicItem }) => {
  // const { openComicDetail } = useDrawerState();
  const router = useRouter();
  const handleOpenDetail = () => {
    router.push(`comic-detail/${data.path_word}`);
    // openComicDetail(data.path_word);
  };

  return (
    <div
      className="flex flex-col group cursor-pointer transition text-sm"
      onClick={handleOpenDetail}
    >
      <CustomImage
        className="w-full pb-[128%] delay-150 duration-300 ease-in-out group-hover:scale-105 cursor-pointer"
        imgProps={{
          src: data.cover,
          alt: data.name,
          className: "rounded-lg object-cover",
          loading: "lazy",
        }}
      />
      {/* <div className="relative w-full pb-[128%] delay-150 duration-300 ease-in-out group-hover:scale-105 cursor-pointer">
        <img
          className="w-full h-full absolute left-0 top-0 rounded-lg object-cover"
          src={data.cover}
          alt={data.name}
        />
      </div> */}
      <div className="flex transition-colors group-hover:text-[grey] mt-3">
        <h3 className="line-clamp-2 flex-1 m-0 font-medium" title={data.name}>
          {data.name}
        </h3>
      </div>
      <div className="flex items-center text-xs text-muted-foreground flex-wrap">
        <p>作者: </p>
        {data.author.map((author) => (
          <Author key={author.path_word} data={author} />
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        更新时间：{data.datetime_updated}
      </p>
    </div>
  );
};
