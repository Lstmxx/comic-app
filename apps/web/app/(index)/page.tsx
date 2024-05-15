import FilterTag from "./components/filter-tag";
import { ComicListParams } from "@copymanga-app/types";
import Content from "./components/content";
import { Suspense } from "react";
import Loading from "./loading";

export default async function Home({
  searchParams,
}: {
  searchParams: Partial<ComicListParams>;
}) {
  console.log("env", process.env.NEXT_PUBLIC_SERVER_API);
  console.log("searchParams", searchParams);

  return (
    <div className="flex flex-col h-full w-full">
      <div className="px-4">
        <FilterTag />
      </div>
      <Suspense fallback={<Loading />}>
        <Content params={searchParams} />
      </Suspense>
    </div>
  );
}
