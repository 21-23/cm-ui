// YOLO: on

import { FunctionalComponent, h } from 'preact';
import { route } from 'preact-router';
import style from './style.css';

const Home: FunctionalComponent = () => {
  return (
    <div>
      <button class={style.button} onClick={() => route('/puzzles')}>Puzzles</button>
      <button class={style.button} onClick={() => route('/sets')}>Sets</button>
      <button class={style.button} onClick={() => route('/sessions')}>Sessions</button>
    </div>
  );
}

export default Home;
