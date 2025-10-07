import { useQuery } from '@tanstack/react-query';
import { getProjects } from '../api/projects.api';
import type { SortConfig } from '../model/sort.model';
import { sortProjectsClientSide } from '../services/clientSort.service';

export const useProjects = (queryParams?: string, sort?: SortConfig | null) =>
  useQuery({
    queryKey: ['projects', queryParams],
    queryFn: async () => {
      const res = await getProjects(queryParams);
      return { items: res.data, meta: res.meta };
    },
    select: (data) => ({
      ...data,
      items: sortProjectsClientSide(data.items, sort || null),
    }),
  });
