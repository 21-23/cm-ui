// YOLO: on

import { FunctionalComponent, h } from 'preact';
import { Route, Router } from 'preact-router';
// import style from './style.css';

import SetsList from './list';
import NewSet from './new';

const Sets: FunctionalComponent = () => {
  return (
    <div>
      <Router>
        <Route path="/sets" component={SetsList} />
        <Route path="/sets/new" component={NewSet} />
      </Router>
    </div>
  );
}

export default Sets;
