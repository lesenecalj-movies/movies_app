export type ListTmdbResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

export type TmdbResponse<T> = {
  id: number;
  results: T[];
};
