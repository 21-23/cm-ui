export type GameType = 'CSS' | 'JS' | 'Lodash';

type NewPuzzleStatePropertyType<ValueT, InternalT> = {
  value: ValueT,
  internal?: InternalT | null,
  valid: boolean,
  message?: string,
}

export type NewPuzzleStateType = {
  name: NewPuzzleStatePropertyType<string, void>,
  description: NewPuzzleStatePropertyType<string, void>,
  expected: string,
  banned: NewPuzzleStatePropertyType<string, void>,
  input: NewPuzzleStatePropertyType<string, string>,
  solution: NewPuzzleStatePropertyType<string, void>,
};
