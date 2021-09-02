// YOLO: on

import { FunctionalComponent, h, JSX } from 'preact';

import type { NewPuzzleStateType } from '../../types/types';

import style from './NewJs.css';

type NewJsPropsType = {
  state: NewPuzzleStateType,
  onChange: (state: NewPuzzleStateType) => void,
};

const NewJs: FunctionalComponent<NewJsPropsType> = ({ state, onChange }) => {
  function onNameChange(event: JSX.TargetedEvent<HTMLInputElement, Event>): void {
    const { value } = event.currentTarget;

    if (!value) {
      return onChange({ ...state, name: { value, valid: false, message: 'Name can not be empty' } });
    }

    onChange({ ...state, name: { value, valid: true } });
  }

  function onDescriptionChange(event: JSX.TargetedEvent<HTMLInputElement, Event>) {
    onChange({ ...state, description: { value: event.currentTarget.value, valid: true } });
  }

  function onSolutionChange(event: JSX.TargetedEvent<HTMLTextAreaElement, Event>): void {
    const { value } = event.currentTarget;

    const { expected, inputError, solutionError } = applySolution(state?.input?.value, value);

    return onChange({
      ...state,
      expected,
      input: { ...state?.input, valid: !inputError, message: inputError },
      solution: { value, valid: !solutionError, message: solutionError },
    });
  }

  function onInputChange(event: JSX.TargetedEvent<HTMLTextAreaElement, Event>): void {
    const { value } = event.currentTarget;

    const { expected, inputError, solutionError } = applySolution(value, state?.solution?.value);

    return onChange({
      ...state,
      expected,
      input: { value, valid: !inputError, message: inputError },
      solution: { ...state?.solution, valid: !solutionError, message: solutionError },
    });
  }

  return (
    <div class={style.panels}>
      <div class={style.inputs}>
        <div class={style.title}>Puzzle data</div>
        <div class={style.name}>
          <div class={style.propName}>Name:</div>
          <input class={state?.name?.valid ? style.inputValid : style.inputInvalid} value={state?.name?.value || ''} onInput={onNameChange} />
          {state?.name?.message && <div class={style.errorMessage}>{state?.name?.message}</div>}
        </div>
        <div class={style.description}>
          <div class={style.propName}>Description:</div>
          <input value={state?.description?.value || ''} onInput={onDescriptionChange} />
        </div>
        <div class={style.solution}>
          <div><span class={style.propName}>Solution</span> (function body, <span class={style.highlight}>input</span> is passed as <span class={style.highlight}>arg</span> automatically):</div>
          <textarea class={state?.solution?.valid ? style.inputValid : style.inputInvalid} value={state?.solution?.value || ''} onInput={onSolutionChange} rows={5} cols={50} />
          {state?.solution?.message && <div class={style.errorMessage}>{state?.solution?.message}</div>}
        </div>
        <div class={style.input}>
          <div><span class={style.propName}>Input</span> (JSON, automatically assigned to <span class={style.highlight}>arg</span> parameter):</div>
          <textarea class={state?.input?.valid ? style.inputValid : style.inputInvalid} value={state?.input?.value || ''} onInput={onInputChange} rows={5} cols={50} />
          {state?.input?.message && <div class={style.errorMessage}>{state?.input?.message}</div>}
        </div>
        <pre class={style.expected}>
          {state?.expected}
        </pre>
      </div>
      <div class={style.examples}>
        <div class={style.title}>Example</div>
        <div class={style.name}>
          <div class={style.propName}>Name:</div>
          <input value="Puzzle name" readonly />
        </div>
        <div class={style.description}>
          <div class={style.propName}>Description:</div>
          <input value="Multiply each element of the array by 2" readonly />
        </div>
        <div class={style.solution}>
          <div class={style.propName}>Solution:</div>
          <textarea value={'return arg.map(e => e * 2);'} readonly rows={5} cols={50} />
        </div>
        <div class={style.input}>
          <div class={style.propName}>Input:</div>
          <textarea value={'[1, 2, 3]'} readonly rows={5} cols={50} />
        </div>
      </div>
    </div>
  );
}

export default NewJs;

function applySolution(inputValue?: string, solution?: string): { expected: string, inputError: string, solutionError: string } {
  const expected = '';
  const inputError = '';
  const solutionError = '';

  if (!inputValue) {
    return { expected, inputError: 'Input can not be empty', solutionError };
  }
  if (!solution) {
    return { expected, inputError, solutionError: 'Solution can not be empty' };
  }

  let input = null;
  try {
    input = JSON.parse(inputValue);
  } catch (error) {
    console.log('Failed to parse `Input`', error);
    return { expected, inputError: 'Can not parse Input', solutionError };
  }

  try {
    const stub = {}; // eslint-disable-line @typescript-eslint/no-unused-vars
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const stubFun = () => {}; // eslint-disable-line @typescript-eslint/no-unused-vars
    const puzzleContent = input; // eslint-disable-line @typescript-eslint/no-unused-vars
    const result = eval(`(function(_, content, ipcRenderer, window, document, location, alert, $, require, process, global, setTimeout, setInterval, requestAnimationFrame, requestIdleCallback, qd) {"use strict"; return (function (arg) {${ solution }})(content);}).call(stub, stub, puzzleContent, stub, stub, stub, stub, stubFun, stub, stubFun, stub, stub, stubFun, stubFun, stubFun, stubFun, stub)`);
    return { expected: JSON.stringify(result), inputError, solutionError };
  } catch (error) {
    return { expected, inputError, solutionError: `Failed to evaluate solution: ${error}` };
  }
}
