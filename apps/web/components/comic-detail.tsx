"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "./ui/drawer";
import { useDrawerState } from "@/store/use-drawer-state";
import { getComicDetail } from "@/lib/comic";
import CustomImage from "./custom-image";
import { ComicDetail as IComicDetail } from "@comic-app/types";
export default function ComicDetail() {
  const { open, comicId, setOpen } = useDrawerState();

  const [detail, setDetail] = useState<IComicDetail>();
  const handleGetDetail = async () => {
    const data = await getComicDetail(comicId);
    console.log(data);
    setDetail(data);
  };

  useEffect(() => {
    if (comicId) {
      handleGetDetail();
    }
  }, [comicId]);
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <div className="flex flex-col container mx-auto h-[80vh]">
          <div className="flex gap-4 items-start">
            <div className="flex-1">
              <CustomImage
                className="w-full"
                imgProps={{
                  src: detail?.comic.cover,
                  alt: detail?.comic.alias,
                  className: "rounded-lg object-cover",
                  loading: "lazy",
                }}
              />
            </div>
            <div className="flex flex-[2] flex-col gap-2">
              <h2 className="text-lg font-semibold">{detail?.comic.alias}</h2>
              <p className="text-sm text-muted-foreground">
                This action cannot be undone.
              </p>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
