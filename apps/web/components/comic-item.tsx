"use client";

import { proxyImg } from "@/lib/fetch";
import { arrayBufferToImgSrc } from "@/lib/img";
import {
  Author as IAuthor,
  ComicItem as IComicItem,
} from "@copymanga-app/types";
import { MouseEventHandler, useEffect, useMemo, useState } from "react";

const Author = ({ data }: { data: IAuthor }) => {
  const handleSearchAuthor: MouseEventHandler<HTMLSpanElement> = (event) => {
    event.stopPropagation();
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
  return (
    <div className="flex flex-col gap-2 group cursor-pointer transition">
      <div className="relative w-full pb-[128%] delay-150 duration-300 ease-in-out group-hover:scale-105 cursor-pointer">
        <img
          className="w-full h-full absolute left-0 top-0 rounded-lg object-cover"
          src={data.cover}
          alt={data.name}
        />
      </div>
      <div className="flex transition-colors group-hover:text-[grey]">
        <h3 className="line-clamp-2 flex-1 m-0 font-medium" title={data.name}>
          {data.name}
        </h3>
      </div>
      <div className="flex items-center text-sm text-muted-foreground flex-wrap">
        <p>作者: </p>
        {data.author.map((author) => (
          <Author key={author.path_word} data={author} />
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        更新时间：{data.datetime_updated}
      </p>
    </div>
  );
};
