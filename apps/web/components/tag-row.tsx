"use client";

import { ALL } from "@/constant";
import { updateListSearchParams } from "@/lib/comic";
import { TagsRes } from "@comic-app/types";
import { useRouter, useSearchParams } from "next/navigation";

export default function TagRow({
  tags,
  tagKey,
}: {
  tags: { value: string; label: string }[];
  tagKey: keyof TagsRes;
}) {
  const router = useRouter();

  const params = useSearchParams();
  const value = params.get(tagKey) || "";
  const handleClickTag = (v: string) => {
    const paramsStr = updateListSearchParams(params, {
      [tagKey]: v,
      page: "1",
    });
    router.push(`?${paramsStr}`);
  };
  return (
    <>
      {tags.map((tag, index) => (
        <p
          key={index}
          className={`${value === tag.value ? "bg-gray-200" : "text-muted-foreground"} cursor-pointer transition hover:bg-gray-200 px-2 py-1 rounded-sm text-wrap`}
          onClick={() => handleClickTag(tag.value)}
        >
          {tag.label}
        </p>
      ))}
    </>
  );
}
