// YOLO: on

import { FunctionalComponent, h } from 'preact';
import { Route, Router } from 'preact-router';

import { IdentityProvider } from '../providers/identity';

import useHistory from '../hooks/useHistory';
import Header from './header';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Puzzles from '../routes/puzzles';
import Sets from '../routes/sets';
import Sessions from '../routes/sessions';

const App: FunctionalComponent = () => {
  const history = useHistory();

  return (
    <div id="app">
      <IdentityProvider>
        <Header />
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <Router history={history}>
          <Route path="/" component={Home} />
          <Route path="/puzzles/:rest*" component={Puzzles} />
          <Route path="/sets/:rest*" component={Sets} />
          <Route path="/sessions/:rest*" component={Sessions} />
        </Router>
      </IdentityProvider>
    </div>
  );
}

export default App;
