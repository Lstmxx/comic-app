export type Theme = {
  initials: number;
  name: string;
  logo: null;
  color_h5: null;
  path_word: string;
  count: number;
};

export type Ordering = {
  name: string;
  path_word: string;
};

export type Top = {
  name: string;
  path_word: string;
};

export type TagsRes = {
  theme: Theme[];
  ordering: Ordering[];
  top: Top[];
};
