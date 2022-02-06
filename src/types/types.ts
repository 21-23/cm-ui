export type GameType = 'CSS' | 'JS' | 'Lodash';
export type GameTypeType = 'cssqd' | 'jsqd' | '_qd';

type ValidityStatePropertyType<ValueT, InternalT> = {
  value: ValueT,
  internal?: InternalT | null,
  valid: boolean,
  message?: string,
}

export type NewPuzzleStateType = {
  name: ValidityStatePropertyType<string, void>,
  description: ValidityStatePropertyType<string, void>,
  timeLimit: ValidityStatePropertyType<number, void>,
  expected: string,
  banned: ValidityStatePropertyType<string, void>,
  input: ValidityStatePropertyType<string, string>,
  solution: ValidityStatePropertyType<string, void>,
  solutionLengthLimit: ValidityStatePropertyType<number, void>,
};

export type NewSetStateType = {
  name: string,
  order: FullPuzzleType[],
};

export type NewSessionStateType = {
  setId: string,
  name: ValidityStatePropertyType<string, void>,
  alias: ValidityStatePropertyType<string, void>,
  date: ValidityStatePropertyType<Date, string>,
  participantLimit?: ValidityStatePropertyType<number, void>,
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

export type FullSetType = {
  id: string,
  name: string,
  order: FullPuzzleType[],
};
