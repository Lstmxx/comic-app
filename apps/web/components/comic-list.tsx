import { ComicItem as IComicItem } from "@copymanga-app/types";
import { ComicItm } from "./comic-item";

export default function ComicList({ list }: { list: IComicItem[] }) {
  return (
    <div className="w-full grid grid-cols-3 gap-4 md:grid-cols-4 md:gap-6 xl:grid-cols-5 lg:gap-12">
      {list.map((comic, index) => (
        <ComicItm key={index} data={comic} />
      ))}
    </div>
  );
}
