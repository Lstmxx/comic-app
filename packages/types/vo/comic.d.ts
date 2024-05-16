export type ComicDetail = {
  is_lock: boolean;
  is_login: boolean;
  is_mobile_bind: boolean;
  is_vip: boolean;
  comic: {
    uuid: string;
    b_404: boolean;
    b_hidden: boolean;
    ban: number;
    name: string;
    alias: string;
    path_word: string;
    close_comment: boolean;
    close_roast: boolean;
    free_type: {
      display: string;
      value: number;
    };
    restrict: {
      value: number;
      display: string;
    };
    reclass: {
      value: number;
      display: string;
    };
    females: any[];
    males: any[];
    clubs: any[];
    img_type: number;
    seo_baidu: string;
    region: {
      value: number;
      display: string;
    };
    status: {
      value: number;
      display: string;
    };
    author: {
      name: string;
      path_word: string;
    }[];
    theme: {
      name: string;
      path_word: string;
    }[];
    parodies: any[];
    brief: string;
    datetime_updated: string;
    cover: string;
    last_chapter: {
      uuid: string;
      name: string;
    };
    popular: number;
  };
  popular: number;
  groups: {
    default: {
      path_word: string;
      count: number;
      name: string;
    };
    tankobon?: {
      path_word: string;
      count: number;
      name: string;
    };
  };
};

type Author = {
  name: string;
  path_word: string;
};

type FreeType = {
  display: string;
  value: number;
};

export type ComicItem = {
  name: string;
  path_word: string;
  free_type: FreeType;
  females: string[];
  males: string[];
  author: Author[];
  theme: string[];
  cover: string;
  popular: number;
  datetime_updated: string;
};

export type ComicList = {
  list: ComicItem[];
  total: number;
  limit: number;
  offset: number;
};

export type ComicSearchItem = {
  name: string;
  path_word: string;
  females: string[];
  author: Author[];
  cover: string;
  popular: number;
  ban: number;
  img_type: number;
  alias: string;
};

export type ComicSearchList = {
  list: ComicItem[];
  total: number;
  limit: number;
  offset: number;
};

export type IComicChapter = {
  index: number;
  uuid: string;
  count: number;
  ordered: number;
  size: number;
  name: string;
  comic_id: string;
  comic_path_word: string;
  group_id: string | null;
  group_path_word: string;
  type: number;
  img_type: number;
  news: string;
  datetime_created: string;
  prev: string;
  next: string;
};

export type IComicChapterRes = {
  list: IComicChapter[];
  total: number;
  limit: number;
  offset: number;
};
