import type { GameType, NewPuzzleStateType } from '../types/types';

// const API_BASE_URL = `${window.location.origin}/api/`;
const API_BASE_URL = 'http://localhost:3000/api/';

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
      // sandboxTimeLimit
      // solutionLengthLimit
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw await response.json();
  }

  const puzzle = await response.json();
  return puzzle.id;
}
