// YOLO: on

import { FunctionalComponent, h, JSX } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import Sortable from 'sortablejs';

import type { FullPuzzleType } from '../../types/types';
import SetOrderItem from './SetOrderItem';

import style from './SetOrder.css';

type SetOrderPropsType = {
  list: FullPuzzleType[],
  order: FullPuzzleType[],
  onChange: (list: FullPuzzleType[], order: FullPuzzleType[]) => void,
};

const SetOrder: FunctionalComponent<SetOrderPropsType> = ({ list, order, onChange }) => {
  const leftRef = useRef<HTMLDivElement>(null);
  const leftSortable = useRef<Sortable>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const rightSortable = useRef<Sortable>(null);

  if (leftSortable.current) {
    leftSortable.current.destroy();
  }
  if (leftRef.current) {
    leftSortable.current = new Sortable(leftRef.current, {
      group: 'shared',
      animation: 150,
      handle: '[data-role="handle"]',
      onUpdate: () => {
        // left list can't be re-ordered => on update
        // set again the current list (before re-order)
        onChange(list, order);
      }
    });
  }

  if (rightSortable.current) {
    rightSortable.current.destroy();
  }
  if (rightRef.current) {
    rightSortable.current = new Sortable(rightRef.current, {
      group: 'shared',
      animation: 150,
      handle: '[data-role="handle"]',
      onSort: () => {
        const puzzles = new Map([...order, ...list].map(puzzle => [puzzle.id, puzzle]));

        const newList = leftSortable.current?.toArray().map(puzzleId => puzzles.get(puzzleId)) as FullPuzzleType[];
        const newOrder = rightSortable.current?.toArray().map(puzzleId => puzzles.get(puzzleId)) as FullPuzzleType[];

        onChange(newList, newOrder);
      }
    });
  }

  return <div class={style.root}>
    <div class={style.column}>
      <div class={style.columTitle}>Available puzzles</div>
      <div class={style.items} ref={leftRef}>
        {list.map((puzzle) => {
          return <SetOrderItem key={puzzle.id} puzzle={puzzle} />
        })}
      </div>
    </div>
    <div class={style.column}>
      <div class={style.columTitle}>New set</div>
      <div class={style.items} ref={rightRef}>
        {order.map((puzzle) => {
          return <SetOrderItem key={puzzle.id} puzzle={puzzle} />
        })}
      </div>
    </div>
  </div>;
};

export default SetOrder;
