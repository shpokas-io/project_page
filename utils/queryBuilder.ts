import { buildSortParam } from '../src/features/projects/services/sort.service';
import type { SortConfig } from '../src/features/projects/model/project.model';

type QueryParams = {
  page: number;
  limit: number;
  sort?: SortConfig | null;
};

export const buildQueryString = (params: QueryParams): string => {
  const queryParts: string[] = [];

  queryParts.push(`page=${params.page}`);
  queryParts.push(`limit=${params.limit}`);

  if (params.sort) {
    const sortParam = buildSortParam(params.sort);
    if (sortParam) {
      queryParts.push(sortParam);
    }
  }

  return queryParts.join('&');
};
