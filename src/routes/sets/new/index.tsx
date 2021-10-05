// YOLO: on

import { FunctionalComponent, h, JSX } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import type { GameType, FullPuzzleType, NewSetStateType } from '../../../types/types';
import style from './style.css';
import { listOwnPuzzles } from '../../../services/puzzle';
import { Game } from '../../../constants/constants';

import GameSelector from '../../../components/game-selector';

const NewSet: FunctionalComponent = () => {
  const [game, setGame] = useState<GameType>('CSS');
  const [puzzles, setPuzzles] = useState<FullPuzzleType[]>([]);
  const [newSet, setNewSet] = useState<NewSetStateType>({ name: '', order: [] });

  useEffect(() => {
    setPuzzles([]);

    listOwnPuzzles({ game: Game[game] }).then((newPuzzles) => {
      setPuzzles(newPuzzles);
    }, (error) => {
      alert(JSON.stringify(error));
    });
  }, [game]);

  async function createSetClick() {

  }

  function onNameChange(event: JSX.TargetedEvent<HTMLInputElement, Event>): void {
    const { value } = event.currentTarget;

    setNewSet({...newSet, name: value});
  }

  return (
    <>
      <div class={style.title}>
        NEW SET
      </div>
      <div class={style.actions}>
        <button className="-positive -bigger" onClick={createSetClick}>Create</button>
      </div>
      <div class={style.inputs}>
        Name: <input value={newSet.name} onInput={onNameChange} />
      </div>
      <GameSelector selected={game} onChange={(game) => setGame(game)} />
      <div>
        {puzzles.map((puzzle) => {
          return <div key={puzzle.id}>{puzzle.name} ({puzzle.solution})</div>;
        })}
      </div>
    </>
  );
}

export default NewSet;
