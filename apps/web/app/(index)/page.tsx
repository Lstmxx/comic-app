import FilterTag from "./_components/filter-tag";
import { IComicPageParams } from "@comic-app/types";
import Content from "./_components/content";
import { Suspense } from "react";
import Loading from "./loading";

export default async function Home({
  searchParams,
}: {
  searchParams: Partial<Omit<IComicPageParams, "offset">> & { page?: string };
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
