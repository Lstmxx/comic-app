import { ComicList, ComicListParams } from "@copymanga-app/types";
import { customFetch } from "./fetch";
import { ReadonlyURLSearchParams } from "next/navigation";

const mergeKeys = (aKeys: string[], bKeys: string[]) => {
  const keys = new Set<string>([...aKeys, ...bKeys]);
  return [...keys];
};

export const updateListSearchParams = (
  searchParams: ReadonlyURLSearchParams,
  params: Partial<ComicListParams>,
) => {
  const p = new URLSearchParams();

  const keys = mergeKeys([...searchParams.keys()], Object.keys(params));
  keys.forEach((key) => {
    p.append(
      key,
      params[key as keyof ComicListParams]?.toString() ||
        searchParams.get(key)?.toString() ||
        "",
    );
  });
  return p.toString();
};

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

export const getComicDetail = async (comicId: string) => {
  const data = await customFetch<ComicList>(`/comic/${comicId}`, {
    method: "GET",
    cache: "no-cache",
  });

  return data;
};
