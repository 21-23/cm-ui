// YOLO: on

import { FunctionalComponent, h } from 'preact';
import { route } from 'preact-router';
import { useEffect, useState } from 'preact/hooks';
import style from './style.css';

import { Game } from '../../../constants/constants';
import { listOwnSets } from '../../../services/set';

import { FullSetType, GameType } from '../../../types/types';

const SetList: FunctionalComponent = () => {
  const [game, setGame] = useState<GameType>('CSS');
  const [sets, setSets] = useState<FullSetType[]>([]);

  useEffect(() => {
    listOwnSets({ game: Game[game] }).then((ownSets) => {
      setSets(ownSets);
    }, (error) => {
      alert(JSON.stringify(error));
    });
  }, [game]);

  return (
    <>
      <div class={style.title}>
        YOUR SETS
      </div>
      <div class={style.actions}>
        <button onClick={() => route('/sets/new')}>NEW</button>
      </div>
    </>
  );
}

export default SetList;
