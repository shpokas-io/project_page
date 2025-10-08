import { useQuery } from '@tanstack/react-query';
import { getProjects } from '../api/projects.api';

export const useProjects = (queryParams?: string) =>
  useQuery({
    queryKey: ['projects', queryParams],
    queryFn: async () => {
      const res = await getProjects(queryParams);
      return { items: res.data, meta: res.meta };
    },
  });