export type ComicListParams = {
  limit: number;
  offset: number;
  ordering: string;
  _update: boolean;
  top: string;
};

export type SearchComicParams = {
  q: string;
  limit: number;
  offset: number;
  q_type: string;
  _update: boolean;
};
