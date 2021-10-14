// YOLO: on

import { FunctionalComponent, h } from 'preact';

import type { FullSetType } from '../../types/types';
import Puzzle from '../puzzles/Puzzle';

import style from './Set.css';

type SetPropsType = {
  set: FullSetType | null,
};

const Set: FunctionalComponent<SetPropsType> = ({ set }) => {
  if (!set) {
    return null;
  }

  return (
    <div class={style.set}>
      <div class={style.setMeta}>
        <div class={style.id}>
          <div class={style.propName}>Id:</div>
          <input value={set.id} readonly disabled />
        </div>
        <div class={style.name}>
          <div class={style.propName}>Name:</div>
          <input value={set.name} readonly disabled />
        </div>
      </div>
      <div class={style.setOrder}>
        <div class={style.propName}>Puzzle order:</div>
        {set.order.map((puzzle) => {
          return <Puzzle key={puzzle.id} puzzle={puzzle} collapsed={true} />
        })}
      </div>
    </div>
  );
}

export default Set;
