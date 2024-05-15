import { DetailedHTMLProps, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

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
  const [loading, setLoading] = useState(true);

  const handleOnLoad = () => {
    setLoading(false);
  };

  return (
    <div className={`${className} relative`}>
      <img
        {...imgProps}
        className={`${imgProps.className} w-full h-full absolute left-0 top-0`}
        onLoad={handleOnLoad}
      />
      {loading && <Skeleton className="w-full h-full absolute left-0 top-0" />}
    </div>
  );
}
