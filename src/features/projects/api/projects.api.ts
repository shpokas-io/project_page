import { fetchClient } from '../../../lib/fetchClient';

export async function getProjects(params?: string) {
  return fetchClient(`landing/projects${params ? `?${params}` : ''}`);
}
