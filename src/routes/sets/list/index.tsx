// YOLO: on

import { FunctionalComponent, h } from 'preact';
import { route } from 'preact-router';
// import style from './style.css';

const SetList: FunctionalComponent = () => {
  return (
    <div>
      SETS
      <button onClick={() => route('/sets/new')}>NEW</button>
    </div>
  );
}

export default SetList;
