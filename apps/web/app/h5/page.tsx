"use client";

import ScrollArea from "./_components/mobile-scroll-area";
import ComicList from "@/components/comic-list";
import { useComicPageStore } from "./hooks/use-comic-page-store";
import { useEffect, useRef } from "react";
import { Toaster } from "@/components/ui/toaster";

export default function H5Page() {
  const store = useComicPageStore();
  const loading = useRef(false);

  useEffect(() => {
    store.handleGetComicPage(1, "reload");
  }, []);

  const handleBottom = async () => {
    console.log("bottom 1");
    if (loading.current) return;
    loading.current = true;
    try {
      await store.handleGetComicPage(store.page + 1, "add");
    } catch (error) {
    } finally {
      loading.current = false;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea
        refreshFn={() => store.handleGetComicPage(1, "reload")}
        onBottom={handleBottom}
      >
        <ComicList list={store.list} />
      </ScrollArea>
    </div>
  );
}
