import { useQuery } from '@tanstack/react-query';
import { getProjects } from '../api/projects.api';
import type { ProjectCardResponse } from '../model/project.model';

export const useProjects = (queryParams?: string) =>
  useQuery<ProjectCardResponse[]>({
    queryKey: ['projects', queryParams],
    queryFn: async () => {
      const res = await getProjects(queryParams);
      return res.data;
    },
  });
