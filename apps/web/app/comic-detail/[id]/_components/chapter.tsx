"use client";

import { getComicChapter } from "@/lib/comic";
import { ComicDetail, IComicChapter } from "@comic-app/types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useEffect, useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";

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

  const LIMIT = 100;
  const [chapterList, setChapterList] = useState<IComicChapter[]>([]);
  const [total, setTotal] = useState(0);
  const handleGetChapter = async () => {
    const data = await getComicChapter({
      name: comicName,
      groupType: tabValue,
      limit: LIMIT.toString(),
      offset: "0",
      _update: true,
    });

    const { list } = data;
    setTotal(data.total);
    setChapterList(list);
  };

  useEffect(() => {
    if (tabValue) {
      handleGetChapter();
    }
  }, [tabValue]);
  return (
    <div className="flex flex-col gap-2">
      <Tabs value={tabValue} className="w-[400px]" onValueChange={setTabValue}>
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger value={tab.id} key={tab.id}>
              {tab.name} ({tab.count})
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <Card>
        <CardContent className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2 pt-6 text-sm text-center">
          {chapterList.map((item) => (
            <span
              className=" border border-gray-200 rounded-sm transition-colors cursor-pointer px-4 py-1 hover:bg-gray-200"
              key={item.comic_id}
            >
              {item.name}
            </span>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
