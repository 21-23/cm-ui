// YOLO: on

import { FunctionalComponent, h } from 'preact';

import { useState } from "preact/hooks";
import style from './style.css';
import type { GameType, NewPuzzleStateType } from '../../../types/types';

import NewCss from '../../../components/puzzles/NewCss';
import NewJs from '../../../components/puzzles/NewJs';
import NewLodash from '../../../components/puzzles/NewLodash';

const Game: { [key in GameType]: string } = {
  CSS: 'cssqd',
  JS: 'jsqd',
  Lodash: '_qd',
};

const GAMES: GameType[] = Object.keys(Game) as GameType[];

type GameSelectorPropsType = {
  selected: GameType,
  onChange: (game: GameType) => void,
};
const GameSelector: FunctionalComponent<GameSelectorPropsType> = ({ selected, onChange }) => {
  return (
    <div class={style.gameSelector}>
      {GAMES.map((game) => {
        const className = game === selected ? '-active' : '';

        return <button key={game} className={className} onClick={() => onChange(game)}>{game}</button>
      })}
    </div>
  );
}



const NewPuzzle: FunctionalComponent = () => {
  const [game, setGame] = useState<GameType>('CSS');
  const [newPuzzle, setNewPuzzle] = useState<{ [key in GameType]: NewPuzzleStateType }>({
    CSS: {
      name: { value: '', valid: false },
      description: { value: '', valid: false },
      expected: '',
      banned: { value: JSON.stringify([]), valid: true },
      input: { value: '', internal: '', valid: false },
      solution: { value: '', valid: false },
    },
    JS: {
      name: { value: '', valid: false },
      description: { value: '', valid: false },
      expected: '',
      banned: { value: '', valid: false },
      input: { value: '', valid: false },
      solution: { value: '', valid: false },
    },
    Lodash: {
      name: { value: '', valid: false },
      description: { value: '', valid: false },
      expected: '',
      banned: { value: '', valid: false },
      input: { value: '', valid: false },
      solution: { value: '', valid: false },
    },
  });

  return (
    <>
      <div class={style.title}>
        NEW PUZZLE
      </div>
      <GameSelector selected={game} onChange={(game) => setGame(game)} />
      {game === 'CSS' && <NewCss state={newPuzzle.CSS} onChange={(CSS) => setNewPuzzle({ ...newPuzzle, CSS })} />}
      {game === 'JS' && <NewJs state={newPuzzle.JS} onChange={(JS) => setNewPuzzle({ ...newPuzzle, JS })} />}
      {game === 'Lodash' && <NewLodash state={newPuzzle.Lodash} onChange={(Lodash) => setNewPuzzle({ ...newPuzzle, Lodash })} />}
    </>
  );
}

export default NewPuzzle;
