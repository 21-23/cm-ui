// YOLO: on

import { h } from 'preact';
import { Router } from 'preact-router';

import useHistory from '../hooks/useHistory';
import Header from './header';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Puzzles from '../routes/puzzles';
import Sessions from '../routes/sessions';

const App = () => {
	const history = useHistory();

	return (
		<div id="app">
			<Header />
			<Router history={history}>
				<Home path="/" />
				<Puzzles path="/puzzles/:rest*" />
				<Sessions path="/sessions" />
			</Router>
		</div>
	);
}

export default App;
