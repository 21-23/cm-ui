// YOLO: on

import { FunctionalComponent, h, JSX } from 'preact';
import { route } from 'preact-router';
import { useState, useEffect } from "preact/hooks";

import style from './style.css';
import type { FullPuzzleType } from '../../../types/types';
import { fetchPuzzle, addHiddenTest } from '../../../services/puzzle';

import Puzzle from '../../../components/puzzles/Puzzle';
import { MarkupRenderer, Line, validateSolution } from '../../../components/puzzles/NewCss';
import { applySolution } from '../../../components/puzzles/NewJs';

type NewHiddenTestStateType = {
  input: string,
  internal: string,
  expected: string,
  lines: Line[],
  valid: boolean,
  message: string,
};

type PuzzleListPropsType = {
  puzzleId: string,
};

const PuzzleList: FunctionalComponent<PuzzleListPropsType> = (props) => {
  const [puzzleId, setPuzzleId] = useState<string>(props.puzzleId || '');
  const [puzzle, setPuzzle] = useState<FullPuzzleType | null>(null);
  const [hidden, setHidden] = useState<NewHiddenTestStateType>({
    input: '',
    internal: '',
    expected: '',
    lines: [],
    valid: false,
    message: 'Input can not be empty',
  });

  useEffect(() => {
    if (!puzzleId) {
      return;
    }

    async function getPuzzle() {
      try {
        const puzzle = await fetchPuzzle(puzzleId);
        setPuzzle(puzzle);
        route(`/puzzles/new/hidden/${puzzle.id}`)
      } catch(error) {
        alert(JSON.stringify(error));
      }
    }

    getPuzzle();
  }, [puzzleId, setPuzzle]);

  function onInputChange(event: JSX.TargetedEvent<HTMLTextAreaElement, Event>): void {
    const { value } = event.currentTarget;

    if (puzzle?.type === 'jsqd') {
      const { expected, inputError } = applySolution(value, puzzle?.solution);
      setHidden({ ...hidden, input: value, internal: value, expected, message: inputError, valid: !inputError });
    } else if (puzzle?.type === 'cssqd') {
      const { lines, internalInput, expected, inputError, solutionError } =
        validateSolution(value, puzzle?.solution, JSON.stringify(puzzle?.constraints?.bannedCharacters), puzzle?.constraints?.solutionLengthLimit ?? -1);
      const message = inputError || solutionError;
        setHidden({ ...hidden, input: value, internal: internalInput, expected, lines, message, valid: !message });
    } else {
      setHidden({ ...hidden, input: value });
    }
  }

  async function addHiddenClick() {
    if (!hidden.valid || !puzzle) {
      return window.alert(`Can not add new hidden test: ${hidden.message}`);
    }

    try {
      const newPuzzleId = await addHiddenTest(puzzle.id, hidden.internal, hidden.expected);
      alert('Hidden test added!');
      window.location.reload();
    } catch (error) {
      alert(JSON.stringify(error));
    }
  }

  return (
    <>
      <div class={style.title}>
        NEW HIDDEN TEST
      </div>
      <div class={style.puzzleSelector}>
        <div class={style.puzzleIdInputLabel}>Puzzle id:</div>
        <input value={puzzleId} onInput={(event) => setPuzzleId(event.currentTarget.value)} class={style.puzzleIdInput} />
      </div>
      <Puzzle puzzle={puzzle} />
      <div class={style.inputs}>
        <div class={style.inputsTitle}>Add a new hidden test below</div>
        <div class={style.input}>
          <div class={style.propName}>Input:</div>
          <textarea class={hidden.valid ? style.inputValid : style.inputInvalid} value={hidden.input} onInput={onInputChange} rows={5} cols={50} />
          {hidden.message && <div class={style.errorMessage}>{hidden.message}</div>}
        </div>
        {puzzle?.type === 'cssqd' && <CssExpected hidden={hidden} />}
        {puzzle?.type === 'jsqd' && <JsExpected hidden={hidden} />}
        {puzzle?.type === '_qd' && <div class={style.errorMessage}>NOT IMPLEMENTED YET</div>}
      </div>
      <div class={style.actions}>
        <button className="-positive -bigger" onClick={addHiddenClick}>Add</button>
      </div>
    </>
  );
}

export default PuzzleList;

const CssExpected: FunctionalComponent<{ hidden: NewHiddenTestStateType }> = ({ hidden }) => {
  return (
    <MarkupRenderer lines={hidden.lines} expected={hidden.expected} />
  );
};

const JsExpected: FunctionalComponent<{ hidden: NewHiddenTestStateType }> = ({ hidden }) => {
  return (
    <pre class={style.jsExpected}>
      {hidden.expected}
    </pre>
  );
};
