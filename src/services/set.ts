import type { FullSetType, NewSetStateType } from '../types/types';

// const API_BASE_URL = `${window.location.origin}/api/`;
const API_BASE_URL = 'http://localhost:3000/api/';

export async function createPuzzleSet(newSet: NewSetStateType): Promise<string> {
  const url = new URL('v1/createPuzzleSet', API_BASE_URL);

  const response = await fetch(url.toString(), {
    method: 'POST',
    body: JSON.stringify({
      name: newSet.name,
      order: newSet.order.map(puzzle => puzzle.id),
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw await response.json();
  }

  const { puzzleSet } = await response.json();
  return puzzleSet.id;
};

export async function fetchFullSet(setId: string): Promise<FullSetType> {
  const url = new URL('v1/getFullPuzzleSet', API_BASE_URL);
  url.searchParams.set('setId', setId);

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw await response.json();
  }

  const { puzzleSet } = await response.json();
  return puzzleSet;
}
