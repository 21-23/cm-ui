import type { NewSessionStateType } from '../types/types';

// const API_BASE_URL = `${window.location.origin}/api/`;
const API_BASE_URL = 'http://localhost:3000/api/';

export async function createSession(newSession: NewSessionStateType): Promise<string> {
  const url = new URL('v1/createPuzzleSession', API_BASE_URL);

  const response = await fetch(url.toString(), {
    method: 'POST',
    body: JSON.stringify({
      name: newSession.name.value,
      puzzleSetId: newSession.setId,
      alias: newSession.alias.value,
      date: newSession.date.internal, // ISO string
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw await response.json();
  }

  const { puzzleSession } = await response.json();
  return puzzleSession.alias;
};
