type SortConfig = {
  id: string;
  desc: boolean;
};

export function buildSortParams(sort: SortConfig | null): string {
  if (!sort) return '';

  const sortParam = JSON.stringify(sort);
  return `sort[]=${encodeURIComponent(sortParam)}`;
}

export function buildQueryString(params: Record<string, string | number | undefined>): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      searchParams.append(key, value.toString());
    }
  });

  return searchParams.toString();
}
