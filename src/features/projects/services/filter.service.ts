import type { Filter, FilterState } from '../model/filter.model';

export const buildFiltersParams = (filters: FilterState): string => {
  const filterParams: string[] = [];

  Object.entries(filters).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;

    let filterValue: any = value;

    if (Array.isArray(value)) {
      if (value.length === 0) return;
      filterValue = value;
    }

    if (typeof value === 'object' && !Array.isArray(value)) {
      const hasMin = value.min !== undefined && value.min !== null && value.min !== '';
      const hasMax = value.max !== undefined && value.max !== null && value.max !== '';

      if (!hasMin && !hasMax) return;

      filterValue = {};
      if (hasMin) filterValue.min = Number(value.min);
      if (hasMax) filterValue.max = Number(value.max);
    }

    const filter: Filter = {
      id: key,
      value: filterValue,
    };

    const encodedFilter = encodeURIComponent(JSON.stringify(filter));
    filterParams.push(`filters[]=${encodedFilter}`);
  });

  return filterParams.join('&');
};

export const hasActiveFilters = (filters: FilterState): boolean => {
  return Object.values(filters).some((value) => {
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    if (typeof value === 'object' && value !== null) {
      return value.min !== undefined || value.max !== undefined;
    }
    return value !== undefined && value !== null && value !== '';
  });
};
