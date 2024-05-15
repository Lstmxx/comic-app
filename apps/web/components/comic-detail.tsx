"use client";

import { useEffect } from "react";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "./ui/drawer";
import { useDrawerState } from "@/store/use-drawer-state";
import { getComicDetail } from "@/lib/comic";

export default function ComicDetail() {
  const { open, comicId } = useDrawerState();

  useEffect(() => {
    if (comicId) {
      getComicDetail(comicId);
    }
  }, [comicId]);
  return (
    <Drawer open={open}>
      <DrawerTrigger>Open</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
