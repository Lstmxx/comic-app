export type IComicPageParams = {
  limit: number;
  offset: number;
  ordering: string;
  _update: boolean;
  theme: string;
  top: string;
};

export type ISearchComicParams = {
  q: string;
  limit: number;
  offset: number;
  q_type: string;
  _update: boolean;
};

export type IChapterParams = {
  name: string;
  groupType: string;
  limit: string;
  offset: string;
  _update: boolean;
};

export type IChapterDetailParams = {
  name: string;
  chapterId: string;
};
