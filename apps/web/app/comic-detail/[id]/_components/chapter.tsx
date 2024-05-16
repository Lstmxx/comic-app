"use client";

import { getComicChapter } from "@/lib/comic";
import { ComicDetail, IComicChapter } from "@comic-app/types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { useEffect, useState, useCallback } from "react";

export default function Chapter({
  groups,
  comicName,
}: {
  comicName: string;
  groups: ComicDetail["groups"];
}) {
  const [tabValue, setTabValue] = useState("");
  const [tabs, setTabs] = useState<
    { count: string; id: string; name: string }[]
  >([]);
  useEffect(() => {
    const values = Object.values(groups);
    const list = values.map((item) => ({
      count: item.count.toString(),
      id: item.path_word,
      name: item.name,
    }));
    setTabs(list);
    setTabValue(list[0].id);
  }, [groups]);

  const [chapterList, setChapterList] = useState<IComicChapter[]>([]);
  const handleGetChapter = async () => {
    const data = await getComicChapter({
      name: comicName,
      groupType: tabValue,
      limit: "100",
      offset: "0",
      _update: true,
    });

    const { limit, total, list } = data;
    setChapterList(list);
  };

  useEffect(() => {
    if (tabValue) {
      handleGetChapter();
    }
  }, [tabValue]);
  return (
    <div className="flex flex-col">
      <Tabs defaultValue={tabValue} className="w-[400px]">
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger value={tab.id} key={tab.id}>
              {tab.name} ({tab.count})
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
