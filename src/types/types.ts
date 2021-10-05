export type GameType = 'CSS' | 'JS' | 'Lodash';
export type GameTypeType = 'cssqd' | 'jsqd' | '_qd';

type NewPuzzleStatePropertyType<ValueT, InternalT> = {
  value: ValueT,
  internal?: InternalT | null,
  valid: boolean,
  message?: string,
}

export type NewPuzzleStateType = {
  name: NewPuzzleStatePropertyType<string, void>,
  description: NewPuzzleStatePropertyType<string, void>,
  timeLimit: NewPuzzleStatePropertyType<number, void>,
  expected: string,
  banned: NewPuzzleStatePropertyType<string, void>,
  input: NewPuzzleStatePropertyType<string, string>,
  solution: NewPuzzleStatePropertyType<string, void>,
  solutionLengthLimit: NewPuzzleStatePropertyType<number, void>,
};

export type NewSetStateType = {
  name: string,
  order: string[],
};

export type UserType = {
  provider: string,
  providerId: string,
  displayName: string,
  uid: string,
};

export type PuzzleTestType = {
  id: string,
  input: string,
  expected: string,
};

export type FullPuzzleType = {
  id: string,
  type: GameTypeType,
  name: string,
  description?: string | null,
  solution: string,
  author: {
      id: string,
      name: string,
  },
  tests: {
    default: PuzzleTestType,
    hidden: PuzzleTestType[],
  },
  constraints: {
      timeLimit: number,
      bannedCharacters: string[],
      sandboxTimeLimit: number,
      solutionLengthLimit: number | null,
  },
};
