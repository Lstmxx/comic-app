"use client";

import { getComicChapter } from "@/lib/comic";
import { ComicDetail, IComicChapter } from "@comic-app/types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import CustomPagination from "@/components/pagination";

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
  const [defaultPage, setDefaultPage] = useState(1);
  const handleGetChapter = async (page = 1) => {
    const data = await getComicChapter({
      name: comicName,
      groupType: tabValue,
      limit: LIMIT.toString(),
      offset: ((page - 1) * LIMIT).toString(),
      _update: true,
    });

    setDefaultPage(page);

    const { list } = data;
    setTotal(data.total);
    setChapterList(list);
  };

  useEffect(() => {
    if (tabValue) {
      handleGetChapter();
    }
  }, [tabValue]);

  const handleToChapter = (id: string) => {
    window.open(`/comic-detail/${comicName}/chapter/${id}`, "_blank");
  };
  return (
    <div className="flex flex-col gap-2 mt-4">
      <Tabs value={tabValue} onValueChange={setTabValue}>
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger value={tab.id} key={tab.id}>
              {tab.name} ({tab.count})
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <Card>
        <CardContent className="grid grid-cols-[repeat(auto-fill,minmax(68px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2 pt-6 text-xs sm:text-sm text-center">
          {chapterList.map((item) => (
            <span
              className="line-clamp-1 border border-gray-200 rounded-sm transition-colors cursor-pointer px-3 py-1 hover:bg-gray-200 sm:line-clamp-none sm:px-4 sm:py-1"
              key={item.index}
              onClick={() => handleToChapter(item.uuid)}
            >
              {item.name}
            </span>
          ))}
        </CardContent>
      </Card>
      <CustomPagination
        total={total}
        limit={LIMIT}
        defaultPage={defaultPage}
        handleJump={(page) => handleGetChapter(page)}
        handleNext={(page) => handleGetChapter(page)}
        handlePre={(page) => handleGetChapter(page)}
      />
    </div>
  );
}
