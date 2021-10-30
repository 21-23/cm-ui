// YOLO: on

import { FunctionalComponent, h } from 'preact';
import { Route, Router } from 'preact-router';

import SessionsList from './list';
import NewSession from './new';
import SessionDetails from './details'

const Sessions: FunctionalComponent = () => {
  return (
    <Router>
      <Route path="/sessions" component={SessionsList} />
      <Route path="/sessions/new/:setId?" component={NewSession} />
      <Route path="/sessions/:sessionId" component={SessionDetails} />
    </Router>
  );
}

export default Sessions;
