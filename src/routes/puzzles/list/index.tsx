// YOLO: on

import { FunctionalComponent, h } from 'preact';
import { route } from 'preact-router';
import { useEffect, useState } from 'preact/hooks';

import { FullPuzzleType, GameType } from '../../../types/types';
import { Game } from '../../../constants/constants';

import GameSelector from '../../../components/game-selector'
import Puzzle from '../../../components/puzzles/Puzzle';
import { listOwnPuzzles } from '../../../services/puzzle';

import style from './style.css';

const PuzzleList: FunctionalComponent = () => {
  const [game, setGame] = useState<GameType>('CSS');
  const [puzzles, setPuzzles] = useState<FullPuzzleType[]>([]);

  useEffect(() => {
    listOwnPuzzles({ game: Game[game] }).then((ownPuzzles) => {
      setPuzzles(ownPuzzles);
    }, (error) => {
      alert(JSON.stringify(error));
    });
  }, [game]);

  return (
    <>
      <div class={style.title}>
        YOUR PUZZLES
      </div>
      <div class={style.actions}>
        <button onClick={() => route('/puzzles/new')}>NEW</button>
        <button onClick={() => route('/puzzles/new/hidden')}>NEW HIDDEN TEST</button>
      </div>
      <div>
        <GameSelector selected={game} onChange={(game) => setGame(game)} />
        <div class={style.list}>
          {puzzles.map((puzzle) => {
            return <Puzzle key={puzzle.id} puzzle={puzzle} collapsed={true} />
          })}
        </div>
      </div>
    </>
  );
}

export default PuzzleList;
