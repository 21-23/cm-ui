// YOLO: on

import { FunctionalComponent, h } from 'preact';
import style from './style.css';

import type { GameType } from '../../types/types';
import { GAMES } from '../../constants/constants';

type GameSelectorPropsType = {
  selected: GameType,
  onChange: (game: GameType) => void,
};

const GameSelector: FunctionalComponent<GameSelectorPropsType> = ({ selected, onChange }) => {
  return (
    <div class={style.gameSelector}>
      {GAMES.map((game) => {
        const className = game === selected ? '-active' : '';

        return <button key={game} className={className} onClick={() => onChange(game)}>{game}</button>
      })}
    </div>
  );
};

export default GameSelector;
