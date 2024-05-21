import { getComicPage } from "@/lib/comic";
import { ComicList, IComicPageParams } from "@comic-app/types";
import { create } from "zustand";

interface ComicPageState {
  list: ComicList["list"];
  total: number;
  page: number;
  limit: 20;
  handleGetComicPage: (
    page: number,
    type: "add" | "reload",
    params?: Partial<Omit<IComicPageParams, "offset">>,
  ) => void;
}

export const useComicPageStore = create<ComicPageState>((set, get) => ({
  list: [],
  total: 0,
  page: 1,
  limit: 20,
  handleGetComicPage: async (page, type = "add", params) => {
    const limit = get().limit;
    const data = await getComicPage({
      _update: false,
      theme: "",
      top: "",
      ...(params || {}),
      offset: (page - 1) * limit,
      limit,
      ordering: "-datetime_updated",
    });

    let newList: ComicList["list"];
    if (type === "reload") {
      newList = data.list;
    } else {
      const hasMap = new Map<string, boolean>();
      const oldList = get().list;
      oldList.forEach((comic) => hasMap.set(comic.path_word, true));

      newList = [
        ...oldList,
        ...data.list.filter((comic) => !hasMap.has(comic.path_word)),
      ];
    }
    set({ list: newList, total: data.total, page });
  },
}));
