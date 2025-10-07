import type { FilterState } from '../src/features/projects/model/filter.model';
import { buildFiltersParams } from '../src/features/projects/services/filter.service';
import { SortConfig } from '../src/features/projects/model/sort.model';
import { buildSortParam } from '../src/features/projects/services/sort.service';

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
