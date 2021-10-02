// YOLO: on

import { FunctionalComponent, h, JSX } from 'preact';

import type { FullPuzzleType } from '../../types/types';

import style from './Puzzle.css';

type PuzzlePropsType = {
  puzzle: FullPuzzleType | null,
};

const Puzzle: FunctionalComponent<PuzzlePropsType> = ({ puzzle }) => {
  if (!puzzle) {
    return null;
  }

  return (
    <div class={style.puzzle}>
      <div class={style.puzzleMeta}>
        <div class={style.id}>
          <div class={style.propName}>Id:</div>
          <input value={puzzle.id} readonly disabled />
        </div>
        <div class={style.type}>
          <div class={style.propName}>Type:</div>
          <input value={puzzle.type} readonly disabled />
        </div>
        <div class={style.name}>
          <div class={style.propName}>Name:</div>
          <input value={puzzle.name} readonly disabled />
        </div>
        <div class={style.description}>
          <div class={style.propName}>Description:</div>
          <input value={puzzle.description || ''} readonly disabled />
        </div>
        <div class={style.authorId}>
          <div class={style.propName}>Author Id:</div>
          <input value={puzzle.author.id} readonly disabled />
        </div>
        <div class={style.authorName}>
          <div class={style.propName}>Author Name:</div>
          <input value={puzzle.author.name} readonly disabled />
        </div>
      </div>
      <div class={style.constraints}>
        <div class={style.timeLimit}>
          <div class={style.propName}>Time Limit (seconds):</div>
          <input value={puzzle.constraints.timeLimit} type="number" readonly disabled />
        </div>
        <div class={style.bannedCharacters}>
          <div class={style.propName}>Banned Characters:</div>
          <input value={JSON.stringify(puzzle.constraints.bannedCharacters)} readonly disabled />
        </div>
        <div class={style.solutionLengthLimit}>
          <div class={style.propName}>Solution length limit:</div>
          <input value={puzzle.constraints.solutionLengthLimit || -1} type="number" readonly disabled />
        </div>
      </div>
      <div class={style.execution}>
        <div class={style.defaults}>
          <div class={style.solution}>
            <div class={style.propName}>Solution:</div>
            <textarea value={puzzle.solution} readonly disabled rows={2} cols={50} />
          </div>
          <div class={style.defaultTest}>
            <div class={style.defaultTestTitle}>Default test</div>
            <div class={style.defaultTestId}>
              <div class={style.propName}>Id:</div>
              <input value={puzzle.tests.default.id} readonly disabled />
            </div>
            <div class={style.defaultTestInput}>
              <div class={style.propName}>Input:</div>
              <textarea value={puzzle.tests.default.input} readonly disabled rows={5} cols={50} />
            </div>
            <div class={style.defaultTestExpected}>
              <div class={style.propName}>Expected:</div>
              <input value={puzzle.tests.default.expected} readonly disabled />
            </div>
          </div>
        </div>
        <div class={style.hidden}>
          {puzzle.tests.hidden.map((test, index) => {
            return (
              <div key={test.id} class={style.test}>
                <div class={style.testTitle}>Hidden test #{index}</div>
                <div class={style.testId}>
                  <div class={style.propName}>Id:</div>
                  <input value={test.id} readonly disabled />
                </div>
                <div class={style.defaultTestInput}>
                  <div class={style.propName}>Input:</div>
                  <textarea value={test.input} readonly disabled rows={3} cols={50} />
                </div>
                <div class={style.defaultTestExpected}>
                  <div class={style.propName}>Expected:</div>
                  <input value={test.expected} readonly disabled />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Puzzle;
