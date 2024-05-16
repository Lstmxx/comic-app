"use client";

export default function RowTag({
  label,
  tags,
}: {
  label?: string;
  tags: {
    id: string;
    name: string;
    type: "region" | "theme" | "author" | "status";
  }[];
}) {
  const handleClick = (id: string) => {};
  return (
    <div className="flex gap-2 items-center text-sm text-muted-foreground flex-wrap">
      {!!label && <span>{label}：</span>}
      {tags.map((tag, index) => (
        <span
          className="bg-gray-200 px-2 py-1 rounded-sm cursor-pointer"
          key={index}
          onClick={() => handleClick(tag.id)}
        >
          {tag.name}
        </span>
      ))}
    </div>
  );
}
