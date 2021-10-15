// YOLO: on

import { FunctionalComponent, h } from 'preact';

import style from './style.css';

type NewSessionPropsType = {
  setId?: string,
};

const NewSession: FunctionalComponent = () => {
  return (
    <>
      <div class={style.title}>
        NEW SESSION
      </div>
      <div class={style.actions}>
        <button className="-positive -bigger" onClick={() => {}}>Create</button>
      </div>
      <div class={style.inputs}>
      </div>
    </>
  );
}

export default NewSession;
