import { ComicList, ComicListParams } from "@copymanga-app/types";
import { customFetch } from "./fetch";

export const getComicPage = async (params: ComicListParams) => {
  const data = await customFetch<ComicList>(
    "/comic/list",
    {
      method: "GET",
      cache: "no-cache",
    },
    {
      ...params,
    },
  );

  return data;
};
