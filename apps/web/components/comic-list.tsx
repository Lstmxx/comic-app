"use client";

import { ComicItem as IComicItem } from "@copymanga-app/types";
import { ComicItm } from "./comic-item";
import { useEffect, useState } from "react";

export default function ComicList({ list }: { list: IComicItem[] }) {
  const [comicList, setComicList] = useState<IComicItem[]>([]);

  useEffect(() => {
    setComicList(list);
  }, [list]);

  return (
    <div className="grid grid-cols-3 gap-4 md:grid-cols-4 md:gap-6 lg:gap-12 xl:grid-cols-5 container">
      {comicList.map((comic) => (
        <ComicItm key={comic.path_word} data={comic} />
      ))}
    </div>
  );
}
