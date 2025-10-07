import type { SortConfig } from '../model/sort.model';

export const buildSortParam = (sort: SortConfig | null): string => {
  if (!sort) return '';

  const sortObject = {
    id: sort.id,
    desc: sort.desc,
  };

  return `sort[]=${encodeURIComponent(JSON.stringify(sortObject))}`;
};

export const toggleSort = (currentSort: SortConfig | null, columnId: string): SortConfig | null => {
  if (currentSort?.id === columnId) {
    if (!currentSort.desc) {
      return { id: columnId as SortConfig['id'], desc: true };
    } else {
      return null;
    }
  }

  return { id: columnId as SortConfig['id'], desc: false };
};
