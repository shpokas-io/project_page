const BASE_URL = import.meta.env.VITE_API_IRL;

export async function fetchClient(endpoint: string, options?: RequestInit) {
  const res = await fetch(`${BASE_URL}/${endpoint}`, options);
  if (!res.ok) throw new Error('Network response error');
  return res.json();
}
