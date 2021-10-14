import type { GameType, GameTypeType, NewPuzzleStateType } from '../types/types';

export const Game: { [key in GameType]: GameTypeType } = {
  CSS: 'cssqd',
  JS: 'jsqd',
  Lodash: '_qd',
};

export const GAMES: GameType[] = Object.keys(Game) as GameType[];
