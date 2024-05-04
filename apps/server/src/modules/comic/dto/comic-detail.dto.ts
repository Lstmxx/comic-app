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
