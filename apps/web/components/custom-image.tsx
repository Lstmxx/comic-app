"use client";

import { DetailedHTMLProps, useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { LoaderCircle } from "lucide-react";

enum IMAGE_STATUS {
  loading = "loading",
  complete = "complete",
  error = "error",
}
export default function CustomImage({
  imgProps,
  className,
}: {
  className: string;
  imgProps: DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >;
}) {
  const [imgState, setImgState] = useState<IMAGE_STATUS>(IMAGE_STATUS.loading);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleOnLoad = () => {
    console.log("complete");
    setImgState(IMAGE_STATUS.complete);
  };

  const handleError = () => {
    setImgState(IMAGE_STATUS.error);
  };

  const handleReload = () => {
    imgRef.current?.src &&
      (imgRef.current.src = imgProps.src || "" + Math.random());
  };

  useEffect(() => {
    if (imgRef.current?.complete) {
      setImgState(IMAGE_STATUS.complete);
    }
  }, []);

  return (
    <div
      className={`${className} relative ${imgState === IMAGE_STATUS.complete ? "" : "pb-[128%]"}`}
    >
      <img
        {...imgProps}
        ref={imgRef}
        className={`${imgProps.className} w-full ${imgState === IMAGE_STATUS.complete ? "" : "h-0"}`}
        onLoad={handleOnLoad}
        onError={handleError}
      />
      {(imgState === IMAGE_STATUS.error ||
        imgState === IMAGE_STATUS.loading) && (
        <div
          className="w-full h-full absolute left-0 top-0 cursor-pointer z-20"
          onClick={handleReload}
        >
          <Skeleton className="w-full h-full" />

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {imgState === IMAGE_STATUS.error ? (
              <span>点击重新加载</span>
            ) : (
              <div className="flex flex-col items-center">
                <LoaderCircle className="animate-spin" size={32} />
                <span>加载中...</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
