import { ProjectsTable } from '../components/ProjectsTable';
import { useProjects } from '../hooks/useProjects';

export const ProjectsPage = () => {
  const { data, isLoading, error } = useProjects('page=1&limit=10');

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading projects</p>;
  if (!data?.length) return <p>No projects found</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Projects</h1>
      <ProjectsTable projects={data} />
    </div>
  );
};
