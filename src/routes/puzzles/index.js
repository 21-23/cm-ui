// YOLO: on

import { h } from 'preact';
import { Router } from 'preact-router';
// import style from './style.css';

import PuzzleList from './list';
import NewPuzzle from './new';

const Puzzles = () => {
	return (
		<div>
      <Router>
				<PuzzleList path="/puzzles" />
				<NewPuzzle path="/puzzles/new" />
			</Router>
		</div>
	);
}

export default Puzzles;
