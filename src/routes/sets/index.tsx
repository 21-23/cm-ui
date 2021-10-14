// YOLO: on

import { FunctionalComponent, h } from 'preact';
import { Route, Router } from 'preact-router';

import SetsList from './list';
import NewSet from './new';
import SetDetails from './details'

const Sets: FunctionalComponent = () => {
  return (
    <div>
      <Router>
        <Route path="/sets" component={SetsList} />
        <Route path="/sets/new" component={NewSet} />
        <Route path="/sets/:setId" component={SetDetails} />
      </Router>
    </div>
  );
}

export default Sets;
