export type GameType = 'CSS' | 'JS' | 'Lodash';

type NewPuzzleStatePropertyType<T> = {
  value: T,
  valid: boolean,
  message?: string,
}

export type NewPuzzleStateType = {
  name: NewPuzzleStatePropertyType<string>,
  description: NewPuzzleStatePropertyType<string>,
  expected: string,
  banned: NewPuzzleStatePropertyType<string>,
  input: NewPuzzleStatePropertyType<string>,
  solution: NewPuzzleStatePropertyType<string>,
};
