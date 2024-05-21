"use client";
import { ScrollArea as CustomScrollArea } from "@/components/ui/scroll-area";
import { LoaderCircle } from "lucide-react";
import { useRef } from "react";

export default function ScrollArea({
  children,
}: {
  children: React.ReactNode;
}) {
  const DISTANCE_Y_MAX_LIMIT = 80;
  const DISTANCE_Y_MIN_LIMIT = 80;

  const viewPortRef = useRef<HTMLDivElement>(null);
  const pullToRefresh = useRef({
    startY: 0,
    endY: 0,
    distanceY: 0,
    loadLock: false,
  });
  const startMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (pullToRefresh.current.loadLock) return;
    pullToRefresh.current.startY = e.touches[0].clientY;
  };
  const move: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (pullToRefresh.current.endY < pullToRefresh.current.startY) return;
    if (pullToRefresh.current.loadLock) return;
    pullToRefresh.current.endY = e.touches[0].clientY;
    pullToRefresh.current.distanceY =
      pullToRefresh.current.endY - pullToRefresh.current.startY;

    if (pullToRefresh.current.distanceY > DISTANCE_Y_MAX_LIMIT) {
      pullToRefresh.current.distanceY = DISTANCE_Y_MAX_LIMIT;
    }
    if (viewPortRef.current) {
      viewPortRef.current.style.transition = "all 0.3s linear";
      viewPortRef.current.style.transform = `translateY(${pullToRefresh.current.distanceY}px)`;
    }
  };
  const moveEnd: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (pullToRefresh.current.endY < pullToRefresh.current.startY) return;
    if (pullToRefresh.current.loadLock) return;
    const resetStyle = () => {
      if (viewPortRef.current) {
        viewPortRef.current.style.transition = "all 0.3s linear";
        viewPortRef.current.style.transform = `translateY(0px)`;
      }
    };
    if (pullToRefresh.current.distanceY < DISTANCE_Y_MIN_LIMIT) {
      resetStyle();
      return;
    }
    pullToRefresh.current.loadLock = true;
    setTimeout(() => {
      resetStyle();
      pullToRefresh.current.loadLock = false;
    }, 1000);
  };
  return (
    <div
      ref={viewPortRef}
      className="flex flex-col h-full"
      onTouchStart={startMove}
      onTouchMove={move}
      onTouchEnd={moveEnd}
    >
      <div className="flex items-center justify-center absolute h-[80px] w-full -top-[80px] bg-gray-300">
        <LoaderCircle className="animate-spin" size={32} />
      </div>
      <CustomScrollArea className="flex-1">{children}</CustomScrollArea>
    </div>
  );
}
