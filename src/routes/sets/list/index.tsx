// YOLO: on

import { FunctionalComponent, h } from 'preact';
import { route } from 'preact-router';
import { useEffect, useState } from 'preact/hooks';
import style from './style.css';

import Set from '../../../components/sets/Set';
import { listOwnSets } from '../../../services/set';

import { FullSetType, GameType } from '../../../types/types';

const SetList: FunctionalComponent = () => {
  const [sets, setSets] = useState<FullSetType[]>([]);

  useEffect(() => {
    listOwnSets({}).then((ownSets) => {
      setSets(ownSets);
    }, (error) => {
      alert(JSON.stringify(error));
    });
  }, []);

  return (
    <>
      <div class={style.title}>
        YOUR SETS
      </div>
      <div class={style.actions}>
        <button onClick={() => route('/sets/new')}>NEW</button>
      </div>
      <div class={style.list}>
        {sets.map((set) => {
          return <Set key={set.id} set={set} collapsed={true} />;
        })}
      </div>
    </>
  );
}

export default SetList;
