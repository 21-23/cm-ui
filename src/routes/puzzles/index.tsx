// YOLO: on

import { FunctionalComponent, h } from 'preact';
import { Route, Router } from 'preact-router';

import PuzzleList from './list';
import NewPuzzle from './new';
import NewHiddenTest from './new-hidden'
import PuzzleDetails from './details'

const Puzzles: FunctionalComponent = () => {
  return (
    <div>
      <Router>
        <Route path="/puzzles" component={PuzzleList} />
        <Route path="/puzzles/new" component={NewPuzzle} />
        <Route path="/puzzles/new/hidden/:puzzleId?" component={NewHiddenTest} />
        <Route path="/puzzles/:puzzleId" component={PuzzleDetails} />
      </Router>
    </div>
  );
}

export default Puzzles;
