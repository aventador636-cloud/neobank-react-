const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface UserData {
  id: string;
  phone: string;
  name: string | null;
  email: string | null;
  created_at: string;
}

export async function updateUser(id: string, data: { name?: string; email?: string }): Promise<UserData> {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Ошибка обновления');
  return res.json();
}
