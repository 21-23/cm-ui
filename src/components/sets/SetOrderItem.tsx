// YOLO: on

import { FunctionalComponent, h, JSX } from 'preact';

import type { FullPuzzleType } from '../../types/types';
import { Whitespace16 } from '../Whitespace';
import useHistory from '../../hooks/useHistory';

import style from './SetOrderItem.css';

type SetOrderItemPropsType = {
  puzzle: FullPuzzleType,
};
const SetOrderItem: FunctionalComponent<SetOrderItemPropsType> = ({ puzzle }) => {
  const history = useHistory();

  function onPreviewClick() {
    const url = new URL(window.location.href);
    url.hash = history.createHref(`/puzzles/${puzzle.id}`);
    window.open(url, puzzle.id, 'width=700,height=500');
  }

  return (
    <div class={style.root} data-id={puzzle.id}>
      <div class={style.handle} data-role="handle">::</div>
      <Whitespace16 />
      <div class={style.title}>{puzzle.name}</div>
      <div class={style.actions}>
        <Whitespace16 />
        <button class="-smaller" title="Preview puzzle" onClick={onPreviewClick}>👁</button>
      </div>
    </div>
  );
};

export default SetOrderItem;
