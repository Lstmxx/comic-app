import { TagsRes } from "@comic-app/types";
import TagRow from "../../../components/tag-row";
import { getAllTag } from "@/lib/tag";

export default async function FilterTag() {
  const ALL_TAG = { label: "全部", value: "" };
  const filters: {
    key: keyof TagsRes;
    name: string;
    tags: { label: string; value: string }[];
  }[] = [
    {
      key: "top",
      name: "类型",
      tags: [ALL_TAG],
    },
    {
      key: "theme",
      name: "主题",
      tags: [ALL_TAG],
    },
    // {
    //   key: "ordering",
    //   name: "排序",
    //   tags: [],
    // },
  ];

  const tags = await getAllTag();

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
