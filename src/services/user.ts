import type { UserType } from '../types/types';

const API_BASE_URL = `${window.location.origin}/api/`;
// const API_BASE_URL = 'http://localhost:3000/api/';

export async function fetchUser(): Promise<UserType> {
  const url = new URL('v1/getUser', API_BASE_URL);

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw await response.json();
  }

  return (await response.json()).user;
}
