import type { FullPuzzleType, NewPuzzleStateType } from '../types/types';

const API_BASE_URL = `${window.location.origin}/api/`;
// const API_BASE_URL = 'http://localhost:3000/api/';

export async function createPuzzle(type: string, newPuzzle: NewPuzzleStateType): Promise<string> {
  const url = new URL('v1/createPuzzle', API_BASE_URL);

  const response = await fetch(url.toString(), {
    method: 'POST',
    body: JSON.stringify({
      name: newPuzzle.name.value,
      solution: newPuzzle.solution.value,
      type,
      input: newPuzzle.input.internal,
      expected: newPuzzle.expected,
      description: newPuzzle.description.value,
      timeLimit: newPuzzle.timeLimit.value,
      bannedCharacters: JSON.parse(newPuzzle.banned.value),
      solutionLengthLimit: newPuzzle.solutionLengthLimit.value,
      // sandboxTimeLimit
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw await response.json();
  }

  const { puzzle } = await response.json();
  return puzzle.id;
}

export async function addHiddenTest(puzzleId: string, input: string, expected: string): Promise<string> {
  const url = new URL('v1/createHiddenTest', API_BASE_URL);

  const response = await fetch(url.toString(), {
    method: 'POST',
    body: JSON.stringify({ puzzleId, input, expected }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw await response.json();
  }

  const { hiddenTest } = await response.json();
  return hiddenTest.id;
}

export async function fetchPuzzle(puzzleId: string): Promise<FullPuzzleType> {
  const url = new URL('v1/getFullPuzzle', API_BASE_URL);
  url.searchParams.set('puzzleId', puzzleId);

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw await response.json();
  }

  const { puzzle } = await response.json();
  return puzzle;
}
