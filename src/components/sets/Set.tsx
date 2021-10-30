// YOLO: on

import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';

import type { FullSetType } from '../../types/types';
import Puzzle from '../puzzles/Puzzle';
import { Whitespace8, Whitespace16 } from '../Whitespace';
import useHistory from '../../hooks/useHistory';

import style from './Set.css';

type SetPropsType = {
  set: FullSetType | null,
  collapsed?: boolean,
};

const Set: FunctionalComponent<SetPropsType> = ({ set, collapsed }) => {
  const [short, setShort] = useState<boolean>(collapsed === true);
  const history = useHistory();

  function onPreviewClick() {
    if (!set) {
      return;
    }

    const url = new URL(window.location.href);
    url.hash = history.createHref(`/sets/${set.id}`);
    window.open(url, set.id, 'width=700,height=500');
  }

  function onCreateSessionClick() {
    if (!set) {
      return;
    }

    const url = new URL(window.location.href);
    url.hash = history.createHref(`/sessions/new/${set.id}`);
    window.open(url, set.id);
  }

  if (!set) {
    return null;
  }

  if (short) {
    return (
      <div class={style.shortSet}>
        <div class={style.shortTitle}>{set.name} ({set.order.length} puzzles)</div>
        <div class={style.actions}>
          <Whitespace16 />
          <button class="-smaller" title="Preview set" onClick={onPreviewClick}>👁</button>
          <Whitespace8 />
          <button class="-smaller" title="Create new session" onClick={onCreateSessionClick}>🗓</button>
          <Whitespace8 />
          <button class="-smaller" title="Expand" onClick={() => { setShort(false); }}>+</button>
        </div>
      </div>
    );
  }

  return (
    <div class={style.set}>
      <div class={style.setMeta}>
        <button class="-smaller" title="Collapse" onClick={() => { setShort(true); }}>-</button>
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
