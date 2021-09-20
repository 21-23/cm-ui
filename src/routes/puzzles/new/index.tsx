// YOLO: on

import { FunctionalComponent, h } from 'preact';
import { route } from 'preact-router';
import { useState } from "preact/hooks";

import style from './style.css';
import type { GameType, NewPuzzleStateType } from '../../../types/types';
import { createPuzzle } from '../../../services/puzzle';

import NewCss from '../../../components/puzzles/NewCss';
import NewJs from '../../../components/puzzles/NewJs';
import NewLodash from '../../../components/puzzles/NewLodash';

const Game: { [key in GameType]: string } = {
  CSS: 'cssqd',
  JS: 'jsqd',
  Lodash: '_qd',
};

const GAMES: GameType[] = Object.keys(Game) as GameType[];

export type ActionStateType = 'IDLE' | 'IN_PROGRESS';

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
      description: { value: '', valid: true },
      timeLimit: { value: 180, valid: true },
      expected: '',
      banned: { value: JSON.stringify([]), valid: true },
      input: { value: '', internal: '', valid: false },
      solution: { value: '', valid: false },
      solutionLengthLimit: { value: -1, valid: true },
    },
    JS: {
      name: { value: '', valid: false },
      description: { value: '', valid: true },
      timeLimit: { value: 180, valid: true },
      expected: '',
      banned: { value: JSON.stringify([]), valid: true },
      input: { value: '', valid: false },
      solution: { value: '', valid: false },
      solutionLengthLimit: { value: -1, valid: true },
    },
    Lodash: {
      name: { value: '', valid: false },
      description: { value: '', valid: true },
      timeLimit: { value: 180, valid: true },
      expected: '',
      banned: { value: JSON.stringify([]), valid: true },
      input: { value: '', valid: false },
      solution: { value: '', valid: false },
      solutionLengthLimit: { value: -1, valid: true },
    },
  });
  const [actionState, setActionState] = useState<ActionStateType>('IDLE');
  const [puzzleId, setPuzzleId] = useState<string>('');

  async function createPuzzleClick() {
    const puzzleState = newPuzzle[game];

    const errors = Object.entries(puzzleState)
      .map(([key, value]) => {
        return !value || (typeof value !== 'string' && !value?.valid) ? key : null;
      })
      .filter(key => !!key);

    if (errors.length > 0) {
      return window.alert(`Some properties are invalid: ${errors}`);
    }

    // there should be a spinner
    if (actionState !== 'IDLE') {
      return window.alert('Another action is in progress');
    }
    setActionState('IN_PROGRESS');

    try {
      const newPuzzleId = await createPuzzle(Game[game], puzzleState);
      alert('Puzzle created!');
      setPuzzleId(newPuzzleId);
    } catch (error) {
      alert(JSON.stringify(error));
    } finally {
      setActionState('IDLE');
    }
  }

  return (
    <>
      <div class={style.title}>
        NEW PUZZLE
      </div>
      <div class={style.actions}>
        <button className="-positive -bigger" onClick={createPuzzleClick}>Create</button>
        <button className="-bigger" onClick={() => route(`/puzzles/new/hidden?puzzleId=${puzzleId}`)}>Add hidden test</button>
      </div>
      {puzzleId && <div class={style.createdPuzzle}>
        Newly created puzzle id:{puzzleId}
      </div>}
      <GameSelector selected={game} onChange={(game) => setGame(game)} />
      {game === 'CSS' && <NewCss state={newPuzzle.CSS} onChange={(CSS) => setNewPuzzle({ ...newPuzzle, CSS })} />}
      {game === 'JS' && <NewJs state={newPuzzle.JS} onChange={(JS) => setNewPuzzle({ ...newPuzzle, JS })} />}
      {game === 'Lodash' && <NewLodash state={newPuzzle.Lodash} onChange={(Lodash) => setNewPuzzle({ ...newPuzzle, Lodash })} />}
    </>
  );
}

export default NewPuzzle;
