// YOLO: on

import { FunctionalComponent, h } from 'preact';
import style from './style.css';

import { useIdentity } from '../../providers/identity';

const Header: FunctionalComponent = () => {
  const identity = useIdentity();

  return (
    <header class={style.header}>
      <div class={style.logo}>
        Quick Draw Content Management
      </div>
      <div class={style.user}>
        <span class={style.userName}>{identity.user?.displayName}</span>
        <button className="-smaller" onClick={() => window.location.assign('/auth/logout')}>Log out</button>
      </div>
    </header>
  );
}

export default Header;
