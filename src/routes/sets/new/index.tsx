// YOLO: on

import { FunctionalComponent, h, JSX } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import type { GameType, FullPuzzleType, NewSetStateType } from '../../../types/types';
import style from './style.css';
import { listOwnPuzzles } from '../../../services/puzzle';
import { createPuzzleSet } from '../../../services/set';
import { Game } from '../../../constants/constants';

import GameSelector from '../../../components/game-selector';
import SetOrder from '../../../components/sets/SetOrder';

const NewSet: FunctionalComponent = () => {
  const [game, setGame] = useState<GameType>('CSS');
  const [newSet, setNewSet] = useState<NewSetStateType>({ name: '', order: [] });
  const [available, setAvailable] = useState<FullPuzzleType[]>([]);

  useEffect(() => {
    setAvailable([]);
    setNewSet({ ...newSet, order: [] });

    listOwnPuzzles({ game: Game[game] }).then((newPuzzles) => {
      setAvailable(newPuzzles);
    }, (error) => {
      alert(JSON.stringify(error));
    });
  }, [game]);

  async function createSetClick() {
    try {
      const setId = await createPuzzleSet(newSet);
      alert(`Set created! Set Id = ${setId}`);
    } catch(error) {
      alert(JSON.stringify(error));
    }
  }

  function onNameChange(event: JSX.TargetedEvent<HTMLInputElement, Event>): void {
    const { value } = event.currentTarget;

    setNewSet({ ...newSet, name: value });
  }

  function onSetOrderChange(list: FullPuzzleType[], order: FullPuzzleType[]): void {
    setAvailable(list);
    setNewSet({ ...newSet, order });
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
      <SetOrder list={available} order={newSet.order} onChange={onSetOrderChange} />
    </>
  );
}

export default NewSet;
