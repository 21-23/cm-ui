// YOLO: on

import { FunctionalComponent, h } from 'preact';
import { route } from 'preact-router';
import style from './style.css';


const SessionsList: FunctionalComponent = () => {
  return (
    <>
      <div class={style.title}>
        YOUR SESSIONS
      </div>
      <div class={style.actions}>
        <button onClick={() => route('/sessions/new')}>NEW</button>
      </div>
    </>
  );
}

export default SessionsList;
