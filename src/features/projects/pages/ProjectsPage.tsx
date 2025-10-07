import { useState } from 'react';
import { Pagination } from '../components/Pagination';
import { ProjectsTable } from '../components/ProjectsTable';
import { useProjects } from '../hooks/useProjects';
import { buildQueryString } from '../../../../utils/queryBuilder';
import { toggleSort } from '../services/sort.service';
import type { SortState } from '../model/project.model';

export const ProjectsPage = () => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortState>(null);
  const limit = 10;

  const queryString = buildQueryString({ page, limit, sort });
  const { data, isLoading, error } = useProjects(queryString);

  const handleSort = (sortKey: string) => {
    const newSort = toggleSort(sort, sortKey);
    setSort(newSort);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Projects</h1>
      <ProjectsTable
        projects={data?.items || []}
        currentSort={sort}
        onSort={handleSort}
        isLoading={isLoading}
        error={error}
      />
      <Pagination page={page} totalPages={data?.meta?.last_page ?? 1} onPageChange={setPage} />
    </div>
  );
};
