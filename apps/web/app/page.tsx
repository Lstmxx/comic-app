import ComicList from "@/components/comic-list";
import { getComicPage } from "@/lib/comic";
import { customFetch } from "@/lib/fetch";

export default async function Home() {
  console.log("env", process.env.NEXT_PUBLIC_SERVER_API);
  const data = await getComicPage({
    limit: 20,
    offset: 1,
    ordering: "ddd",
    _update: false,
    top: "",
  });
  return (
    <div className="flex min-h-screen p-2 md:py-12 md:px-24">
      <ComicList list={data.list}></ComicList>
    </div>
  );
}
