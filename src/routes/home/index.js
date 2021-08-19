import { h } from 'preact';
import { route } from 'preact-router';
import style from './style.css';

const Home = () => (
	<div>
		<button class={style.button} onClick={() => route('/puzzles')}>Puzzles</button>
		<button class={style.button} onClick={() => route('/sessions')}>Sessions</button>
	</div>
);

export default Home;
