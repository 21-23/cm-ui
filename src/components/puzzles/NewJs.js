// YOLO: on

import { h } from 'preact';

import style from './NewJs.css';

export default function NewJs({ state, onChange }) {
  function onNameChange(event) {
    const { value } = event.target;

    if (!value) {
      return onChange({ ...state, name: { value, valid: false, message: 'Name can not be empty' } });
    }

    onChange({ ...state, name: { value, valid: true } });
  }

  function onDescriptionChange(event) {
    onChange({ ...state, description: { value: event.target.value, valid: true } });
  }

  function onSolutionChange() {
    const { value } = event.target;

    if (!value) {
      return onChange({ ...state, solution: { value, valid: false, message: 'Solution can not be empty' } });
    }

    const { expected, solutionError } = applySolution(state?.input?.value, value);

    return onChange({
      ...state,
      expected,
      solution: { value, valid: !solutionError, message: solutionError },
    });
  }

  function onInputChange(event) {
    const { value } = event.target;

    try {
      JSON.parse(value);
      const { expected, inputError } = applySolution(value, state?.solution?.value);
      return onChange({...state, expected, input: { value, valid: !inputError, message: inputError } });
    } catch (error) {
      console.log('Failed to parse `Input`', error);
      return onChange({...state, input: { value, valid: false, message: 'Can not parse Input' } });
    }
  }

  return (
    <div class={style.panels}>
      <div class={style.inputs}>
        <div class={style.title}>Puzzle data</div>
        <div class={style.name}>
          <div>Name:</div>
          <input class={state?.name?.valid ? style.inputValid : style.inputInvalid} value={state?.name?.value || ''} onInput={onNameChange} />
          {state?.name?.message && <div class={style.errorMessage}>{state?.name?.message}</div>}
        </div>
        <div class={style.description}>
          <div>Description:</div>
          <input value={state?.description?.value || ''} onInput={onDescriptionChange} />
        </div>
        <div class={style.solution}>
          <div>Solution (function body, <span class={style.highlight}>input</span> is passed as <span class={style.highlight}>arg</span> automatically):</div>
          <textarea class={state?.solution?.valid ? style.inputValid : style.inputInvalid} value={state?.solution?.value || ''} onInput={onSolutionChange} rows="5" cols="50" />
          {state?.solution?.message && <div class={style.errorMessage}>{state?.solution?.message}</div>}
        </div>
        <div class={style.input}>
          <div>Input (JSON, automatically assigned to <span class={style.highlight}>arg</span> parameter):</div>
          <textarea class={state?.input?.valid ? style.inputValid : style.inputInvalid} value={state?.input?.value || ''} onInput={onInputChange} rows="5" cols="50" />
          {state?.input?.message && <div class={style.errorMessage}>{state?.input?.message}</div>}
        </div>
        <pre class={style.expected}>
          {state?.expected}
        </pre>
      </div>
      <div class={style.examples}>
        <div class={style.title}>Example</div>
        <div class={style.name}>
          <div>Name:</div>
          <input value="Puzzle name" readonly="readonly" />
        </div>
        <div class={style.description}>
          <div>Description:</div>
          <input value="Multiply each element of the array by 2" readonly="readonly" />
        </div>
        <div class={style.solution}>
          <div>Solution:</div>
          <textarea value={'return arg.map(e => e * 2);'} readonly="readonly" rows="5" cols="50" />
        </div>
        <div class={style.input}>
          <div>Input:</div>
          <textarea value={'[1, 2, 3]'} readonly="readonly" rows="5" cols="50" />
        </div>
      </div>
    </div>
  );
}

function applySolution(input, solution) {
  let expected = '';
  let inputError = '';
  let solutionError = '';

  if (!input) {
    return { expected, inputError: 'Input can not be empty', solutionError };
  }
  if (!solution) {
    return { expected, inputError, solutionError: 'Solution can not be empty' };
  }

  try {
    const stub = {}; // eslint-disable-line no-unused-vars
    const stubFun = () => {}; // eslint-disable-line no-unused-vars
    const puzzleContent = JSON.parse(input); // eslint-disable-line no-unused-vars
    const result = eval(`(function(_, content, ipcRenderer, window, document, location, alert, $, require, process, global, setTimeout, setInterval, requestAnimationFrame, requestIdleCallback, qd) {"use strict"; return (function (arg) {${ solution }})(content);}).call(stub, stub, puzzleContent, stub, stub, stub, stub, stubFun, stub, stubFun, stub, stub, stubFun, stubFun, stubFun, stubFun, stub)`);
    return { expected: JSON.stringify(result), inputError, solutionError };
  } catch (error) {
    return { expected, inputError, solutionError: `Failed to evaluate solution: ${error}` };
  }
}
