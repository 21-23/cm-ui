// YOLO: on

import { FunctionalComponent, h } from 'preact';
import { route } from 'preact-router';
// import style from './style.css';

const PuzzleList: FunctionalComponent = () => {
  return (
    <div>
      PUZZLES
      <button onClick={() => route('/puzzles/new')}>NEW</button>
    </div>
  );
}

export default PuzzleList;
