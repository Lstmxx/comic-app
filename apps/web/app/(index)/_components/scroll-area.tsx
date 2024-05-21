"use client";
import { ScrollArea as CustomScrollArea } from "@/components/ui/scroll-area";
import { useScrollState } from "../_hooks/use-scroll-store";
import { UIEventHandler, useEffect, useRef } from "react";

export default function ScrollArea({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const store = useScrollState();
  useEffect(() => {
    if (ref.current) {
      store.ref = ref.current;
    }
  }, [ref, store]);

  const handleScroll: UIEventHandler<HTMLDivElement> = (e) => {
    console.log(e);
  };
  return (
    <CustomScrollArea className="flex-1 w-full p-2" onScroll={handleScroll}>
      <div ref={ref}>{children}</div>
    </CustomScrollArea>
  );
}
