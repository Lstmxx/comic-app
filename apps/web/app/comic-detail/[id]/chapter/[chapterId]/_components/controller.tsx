"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Controller({
  prev,
  next,
  comicId,
}: {
  prev: string | null;
  next: string | null;
  comicId: string;
}) {
  const router = useRouter();
  const handleRoute = (id: string) => {
    router.push(`/comic-detail/${comicId}/chapter/${id}`);
  };
  const handleBack = () => {
    router.push(`/comic-detail/${comicId}`);
  };
  return (
    <div className="flex gap-2 items-center justify-center">
      <Button disabled={prev === null} onClick={() => handleRoute(prev!)}>
        上一章
      </Button>
      <Button variant="secondary" onClick={handleBack}>
        返回目录
      </Button>
      <Button disabled={next === null} onClick={() => handleRoute(next!)}>
        下一章
      </Button>
    </div>
  );
}
