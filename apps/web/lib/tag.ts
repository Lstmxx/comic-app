import { TagsRes } from "@comic-app/types";
import { customFetch } from "./fetch";

export const getAllTag = async () => {
  const data = await customFetch<TagsRes>("/tag", {
    method: "GET",
  });

  return data;
};
