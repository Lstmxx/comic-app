import { TagsRes } from "@copymanga-app/types";
import TagRow from "./tag-row";

export default async function FilterTag({ tags }: { tags: TagsRes }) {
  const ALL = { label: "全部", value: "" };
  const filters: {
    key: keyof TagsRes;
    name: string;
    tags: { label: string; value: string }[];
  }[] = [
    {
      key: "top",
      name: "类型",
      tags: [ALL],
    },
    {
      key: "theme",
      name: "主题",
      tags: [ALL],
    },
    {
      key: "ordering",
      name: "排序",
      tags: [],
    },
  ];

  filters.forEach((filter) => {
    tags[filter.key].forEach((tag) => {
      filter.tags.push({
        label: tag.name,
        value: tag.path_word,
      });
    });
  });

  return (
    <div className="flex flex-col gap-2 text-sm py-4 container">
      {filters.map((filter, index) => (
        <div className="flex items-center flex-wrap" key={index}>
          <span className="mr-2">{filter.name}: </span>
          <TagRow tags={filter.tags} tagKey={filter.key} />
        </div>
      ))}
    </div>
  );
}
