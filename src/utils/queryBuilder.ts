import type { FilterState } from '../features/projects/model/filter.model';
import type { SortConfig } from '../features/projects/model/sort.model';
import { buildFiltersParams } from '../features/projects/services/filter.service';
import { buildSortParam } from '../features/projects/services/sort.service';

type QueryParams = {
  page: number;
  limit: number;
  sort?: SortConfig | null;
  filters?: FilterState;
  search?: string;
};

export const buildQueryString = (params: QueryParams): string => {
  const queryParts: string[] = [];

  queryParts.push(`page=${params.page}`);
  queryParts.push(`limit=${params.limit}`);

  if (params.search && params.search.trim()) {
    queryParts.push(`search=${encodeURIComponent(params.search.trim())}`);
  }

  if (params.sort) {
    const sortParam = buildSortParam(params.sort);
    if (sortParam) {
      queryParts.push(sortParam);
    }
  }

  if (params.filters) {
    const filtersParam = buildFiltersParams(params.filters);
    if (filtersParam) {
      queryParts.push(filtersParam);
    }
  }

  return queryParts.join('&');
};
