import { useState } from 'react';
import { ProjectsTable } from '../components/ProjectsTable';
import { useProjects } from '../hooks/useProjects';
import { toggleSort } from '../services/sort.service';
import { ProjectsPagination } from '../components/Pagination';
import { PageSizeSelector } from '../components/PageSizeSelector';
import type { SortState } from '../model/sort.model';
import type { FilterState } from '../model/filter.model';
import { FilterPanel } from '../components/FilterPanel';
import { buildQueryString } from '../../../utils/queryBuilder';

export const ProjectsPage = () => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortState>(null);
  const [filters, setFilters] = useState<FilterState>({});
  const [limit, setLimit] = useState(10);

  const queryString = buildQueryString({ page, limit, sort, filters });
  const { data, isLoading, error } = useProjects(queryString, sort);

  const handleSort = (sortKey: string) => {
    const newSort = toggleSort(sort, sortKey);
    setSort(newSort);
  };

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleResetFilters = () => {
    setFilters({});
    setPage(1);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Projects</h1>

      <div className="flex justify-end items-center gap-4 mb-4">
        <PageSizeSelector currentLimit={limit} onLimitChange={handleLimitChange} />
        <FilterPanel
          onFiltersChange={handleFiltersChange}
          onReset={handleResetFilters}
          filters={filters}
        />
      </div>

      <ProjectsTable
        projects={data?.items || []}
        currentSort={sort}
        onSort={handleSort}
        isLoading={isLoading}
        error={error}
      />

      <ProjectsPagination
        currentPage={page}
        totalPages={data?.meta?.last_page ?? 1}
        onPageChange={setPage}
      />
    </div>
  );
};
