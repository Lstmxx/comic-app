import {
  ComicDetail,
  ComicList,
  IChapterDetail,
  IChapterDetailParams,
  IChapterParams,
  IComicChapterRes,
  IComicListParams,
} from "@comic-app/types";
import { customFetch } from "./fetch";
import { ReadonlyURLSearchParams } from "next/navigation";
import { ALL } from "@/constant";

const mergeKeys = (aKeys: string[], bKeys: string[]) => {
  const keys = new Set<string>([...aKeys, ...bKeys]);
  return [...keys];
};

export const updateListSearchParams = (
  searchParams: ReadonlyURLSearchParams,
  params: Partial<IComicListParams & { page: string }>,
) => {
  const p = new URLSearchParams();

  const keys = mergeKeys([...searchParams.keys()], Object.keys(params));
  keys.forEach((key) => {
    const value = Object.hasOwnProperty.call(params, key)
      ? params[key as keyof IComicListParams]?.toString()
      : searchParams.get(key)?.toString() || "";
    if (value) {
      p.append(key, value);
    }
  });
  return p.toString();
};

export const getComicPage = async (params: IComicListParams) => {
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
  const data = await customFetch<ComicDetail>(`/comic/${comicId}`, {
    method: "GET",
    cache: "no-cache",
  });

  return data;
};

export const getComicChapter = async (params: IChapterParams) => {
  const data = await customFetch<IComicChapterRes>(
    `/comic/chapter`,
    {
      method: "GET",
      cache: "no-cache",
    },
    params,
  );
  return data;
};

export const getComicChapterDetail = async (params: IChapterDetailParams) => {
  const data = await customFetch<IChapterDetail>(
    `/comic/chapter/detail`,
    {
      method: "GET",
      cache: "no-cache",
    },
    params,
  );
  return data;
};
