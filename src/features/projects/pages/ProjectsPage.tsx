import { useState } from 'react';
import { Pagination } from '../components/Pagination';
import { ProjectsTable } from '../components/ProjectsTable';
import { useProjects } from '../hooks/useProjects';
import { Loader } from '../../../component/ui/Loader';

export const ProjectsPage = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isLoading, error } = useProjects(`page=${page}&limit=${limit}`);

  if (isLoading) return <Loader />;
  if (error) return <p>Error loading projects</p>;
  if (!data?.items?.length) return <p>No projects found</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Projects</h1>
      <ProjectsTable projects={data.items} />
      <Pagination page={page} totalPages={data.meta?.last_page ?? 1} onPageChange={setPage} />
    </div>
  );
};
