"use client";

import { ComicItem as IComicItem } from "@comic-app/types";
import { ComicItm } from "./comic-item";
import { useEffect, useState } from "react";

export default function ComicList({ list }: { list: IComicItem[] }) {
  const [comicList, setComicList] = useState<IComicItem[]>([]);
  console.log("list", list);

  useEffect(() => {
    setComicList(list);
  }, [list]);

  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-4 sm:container md:grid-cols-4 md:gap-6 lg:gap-12 xl:grid-cols-5">
      {comicList.map((comic) => (
        <ComicItm key={comic.path_word} data={comic} />
      ))}
    </div>
  );
}
