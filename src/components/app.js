import { h } from 'preact';
import { Router } from 'preact-router';

import Header from './header';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Puzzles from '../routes/puzzles';
import Sessions from '../routes/sessions';

const App = () => (
	<div id="app">
		<Header />
		<Router>
			<Home path="/" />
			<Puzzles path="/puzzles/:rest*" />
			<Sessions path="/sessions" />
		</Router>
	</div>
)

export default App;
