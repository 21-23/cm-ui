// YOLO: on

import { h } from 'preact';

import { useState } from "preact/hooks";
import style from './style.css';

import NewCss from '../../../components/puzzles/NewCss';
import NewJs from '../../../components/puzzles/NewJs';
import NewLodash from '../../../components/puzzles/NewLodash';

const GAMES = ['CSS', 'JS', 'Lodash'];

function GameSelector({ selected, onChange }) {
	return (
		<div class={style.gameSelector}>
			{GAMES.map((game) => {
				const className = game === selected ? '-active' : '';

				return <button key={game} className={className} onClick={() => onChange(game)}>{game}</button>
			})}
		</div>
	);
}

export default function NewPuzzle() {
	const [game, setGame] = useState('CSS');
	const [newPuzzle, setNewPuzzle] = useState({ CSS: null, JS: null, Lodash: null });

	return (
		<>
			<div>
				NEW PUZZLE
			</div>
			<GameSelector selected={game} onChange={(game) => setGame(game)} />
			{game === 'CSS' && <NewCss state={newPuzzle.CSS} onChange={(CSS) => setNewPuzzle({ ...newPuzzle, CSS })} />}
			{game === 'JS' && <NewJs state={newPuzzle.JS} onChange={(JS) => setNewPuzzle({ ...newPuzzle, JS })} />}
			{game === 'Lodash' && <NewLodash state={newPuzzle.Lodash} onChange={(Lodash) => setNewPuzzle({ ...newPuzzle, Lodash })} />}
		</>
	);
}
