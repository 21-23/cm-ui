// YOLO: on

import { FunctionalComponent, h, JSX } from 'preact';
import { useState } from 'preact/hooks';

import type { NewPuzzleStateType } from '../../types/types';

import style from './NewCss.css';

type Line = {
  qdId: string,
  tagName: string,
  tagValue: string | null,
  selfClosing: boolean,
  indent: number,
  attributes: Array<{ name: string, value: string }>,
};

type NewCssPropsType = {
  state: NewPuzzleStateType,
  onChange: (state: NewPuzzleStateType) => void,
};

const NewCss: FunctionalComponent<NewCssPropsType> = ({ state, onChange }) => {
  const [lines, setLines] = useState<Line[]>([]);

  function onNameChange(event: JSX.TargetedEvent<HTMLInputElement, Event>) {
    const { value } = event.currentTarget;

    if (!value) {
      return onChange({ ...state, name: { value, valid: false, message: 'Name can not be empty' } });
    }

    onChange({ ...state, name: { value, valid: true } });
  }

  function onDescriptionChange(event: JSX.TargetedEvent<HTMLInputElement, Event>) {
    onChange({ ...state, description: { value: event.currentTarget.value, valid: true } });
  }

  function onBannedChange(event: JSX.TargetedEvent<HTMLInputElement, Event>) {
    const { value } = event.currentTarget;

    const { lines, expected, inputError, solutionError, bannedError } = validateSolution(state?.input?.value, state?.solution?.value, value);

    setLines(lines);
    onChange({
      ...state,
      expected,
      banned: { value, valid: !bannedError, message: bannedError },
      input: { ...state?.input, valid: !inputError, message: inputError },
      solution: { ...state?.solution, valid: !solutionError, message: solutionError },
    });
  }

  function onSolutionChange(event: JSX.TargetedEvent<HTMLInputElement, Event>) {
    const { value } = event.currentTarget;

    const { lines, expected, inputError, solutionError, bannedError } = validateSolution(state?.input?.value, value, state?.banned?.value);

    setLines(lines);
    onChange({
      ...state,
      expected,
      banned: { ...state?.banned, valid: !bannedError, message: bannedError },
      input: { ...state?.input, valid: !inputError, message: inputError },
      solution: { value, valid: !solutionError, message: solutionError },
    });
  }

  function onInputChange(event: JSX.TargetedEvent<HTMLTextAreaElement, Event>) {
    const { value } = event.currentTarget;

    const { lines, expected, inputError, solutionError, bannedError } = validateSolution(value, state?.solution?.value, state?.banned?.value);

    setLines(lines);
    onChange({
      ...state,
      expected,
      banned: { ...state?.banned, valid: !bannedError, message: bannedError },
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
        <div class={style.banned}>
          <div><span class={style.propName}>Banned characters</span> (JSON array):</div>
          <input class={state?.banned?.valid ? style.inputValid : style.inputInvalid} value={state?.banned?.value || ''} onInput={onBannedChange} placeholder={'[",", "+", "d"]'} />
          {state?.banned?.message && <div class={style.errorMessage}>{state?.banned?.message}</div>}
        </div>
        <div class={style.solution}>
          <div class={style.propName}>Solution:</div>
          <input class={state?.solution?.valid ? style.inputValid : style.inputInvalid} value={state?.solution?.value || ''} onInput={onSolutionChange} />
          {state?.solution?.message && <div class={style.errorMessage}>{state?.solution?.message}</div>}
        </div>
        <div class={style.input}>
          <div class={style.propName}>Input:</div>
          <textarea class={state?.input?.valid ? style.inputValid : style.inputInvalid} value={state?.input?.value || ''} onInput={onInputChange} rows={5} cols={50} />
          {state?.input?.message && <div class={style.errorMessage}>{state?.input?.message}</div>}
          <MarkupRenderer lines={lines} expected={state?.expected} />
        </div>
      </div>
      <div class={style.examples}>
      <div class={style.title}>Example</div>
        <div class={style.name}>
          <div class={style.propName}>Name:</div>
          <input value="Puzzle name" readonly />
        </div>
        <div class={style.description}>
          <div class={style.propName}>Description:</div>
          <input value="Short description" readonly />
        </div>
        <div class={style.banned}>
          <div class={style.propName}>Banned characters:</div>
          <input value={'["#", ","]'} readonly />
        </div>
        <div class={style.solution}>
          <div class={style.propName}>Solution:</div>
          <input value=".spcl" readonly />
        </div>
        <div class={style.input}>
          <div class={style.propName}>Input:</div>
          <textarea value={'<div><span class="spcl">content</span></div>'} readonly rows={5} cols={50} />
        </div>
      </div>
    </div>
  );
}

export default NewCss;

function validateSolution(inputValue: string, solutionValue: string, bannedValue: string) {
  const { input, inputError } = parseInput(inputValue);
  const parsedSolution = parseSolution(solutionValue);
  let solutionError = parsedSolution.solutionError;
  const solution = parsedSolution.solution;
  const { banned, bannedError } = parseBanned(bannedValue);
  let lines: Line[] = [];
  let expected: string[] = [];

  // check solution for banned characters
  if (!solutionError && !bannedError && banned.length > 0) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
    const escapeSymbolsRegex = /[.*+?^${}()|[\]\\]/g;
    const chars = banned.map((char) => char.replace(escapeSymbolsRegex, '\\$&')).join('|');
    if (new RegExp(`(${chars})`, 'i').test(solution)) {
      solutionError = 'Solution can not contain banned characters';
    }
  }

  // parse input to lines
  if (!inputError) {
    const container = document.createElement('div');
    container.innerHTML = input;
    lines = nodesToLines(Array.from(container.childNodes as NodeListOf<Element>), { qdIdCounter: 0 }, 0);
    // if (lines.length > 0) {
      const decoder = document.createElement('textarea');
      decoder.innerHTML = container.innerHTML;
      console.log(decoder.value); // TODO: store this value and actually send to server
    // }

    // apply solution
    if (!solutionError) {
      try {
        expected = Array.from(container.querySelectorAll<HTMLElement>(solution)).map<string>((node) => node.dataset['qdid'] || '').filter(qdid => !!qdid);
        if (expected.length < 1) {
          solutionError = 'Given solution does not query any node from the input';
        }
      } catch (error) {
        console.log('Failed to run solution', error);
        solutionError = 'Can not querySelectorAll the given solution';
      }
    }
  }

  return { lines, expected: JSON.stringify(expected), inputError, solutionError, bannedError };
}

function parseInput(inputValue: string): { input: string, inputError: string } {
  if (!inputValue) {
    return { input: inputValue, inputError: 'Input can not be empty' };
  }

  return { input: inputValue, inputError: '' };
}

function parseSolution(solutionValue: string): { solution: string, solutionError: string } {
  if (!solutionValue) {
    return { solution: solutionValue, solutionError: 'Solution can not be empty' };
  }

  return { solution: solutionValue, solutionError: '' };
}

function parseBanned(bannedValue: string): { banned: string[], bannedError: string } {
  try {
    const banned = JSON.parse(bannedValue);
    if (!Array.isArray(banned)) {
      return { banned, bannedError: 'Banned characters must be an array. Example: [".", "#", "d"]' };
    }
    if (banned.some((char) => !char || typeof char !== 'string')) {
      return { banned, bannedError: 'Banned characters must be non-empty strings. Example: [".", "#", "d"]' };
    }
    return { banned, bannedError: '' };
  } catch(error) {
    console.log('Failed to parse `Banned characters`', error);
    return { banned: [], bannedError: 'Invalid JSON. Example: [".", "#", "d"]' };
  }
}

type MarkupRendererPropsType = {
  lines: Line[],
  expected: string,
};
const MarkupRenderer: FunctionalComponent<MarkupRendererPropsType> = ({ lines, expected }) => {
  let arrayOfExpected: string[] = [];
  try {
    if (expected) {
      arrayOfExpected = JSON.parse(expected);
    }
  } catch (error) {
    console.log('Failed to parse `expected`', error);
  }

  return (
    <pre class={style.expected}>
      {lines.map((line, index) => {
        return <Line line={line} key={index} selected={arrayOfExpected.includes(line.qdId)} />
      })}
    </pre>
  );
}

type LinePropsType = {
  line: Line,
  selected: boolean,
};
const Line: FunctionalComponent<LinePropsType> = ({ line, selected }) => {
  if (line.tagName === '#text') {
    return <div class={style.line}>
      <span>{'  '.repeat(line.indent)}</span>
      {line.tagValue}
    </div>;
  }

  return <div class={selected ? style.lineSelected : style.line}>
    <span>{'  '.repeat(line.indent)}</span>
    {
      line.qdId !== '-1'
      ? <span>
          {'<'}
          <span>{line.tagName}</span>
          {line.attributes.map(({name, value}) => {
            const parts = [name];
            if (value) {
              parts.push(`"${value}"`);
            }
            return <span key={name}>{' '}{parts.join('=')}</span>;
          })}
          {line.selfClosing ? ' />' : '>'}
        </span>
      : <span>{'</'}<span>{line.tagName}</span>{'>'}</span>
    }
  </div>
}

function nodesToLines(nodes: Element[], options: { qdIdCounter: number }, indent: number): Line[] {
  const lines: Line[] = [];

  nodes.forEach((node) => {
    const qdId = `${++options.qdIdCounter}`;
    const line = nodeToLine(node, qdId, indent);
    lines.push(line);
    if (line.tagName === '#text') {
      return;
    }
    node.setAttribute('data-qdid', qdId);
    if (node.children.length > 0 || !line.selfClosing) {
      lines.push(...nodesToLines(Array.from(node.childNodes as NodeListOf<Element>), options, indent + 1));
      lines.push(nodeToLine(node, '-1', indent));
    }
  });

  return lines;
}

// https://www.w3.org/TR/html51/syntax.html#void-elements
const VOID_ELEMENTS: string[] = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr'];

function nodeToLine(node: Element, qdId: string, indent: number): Line {
  const tagName = node.nodeName.toLowerCase();

  return {
    qdId,
    tagName,
    tagValue: node.nodeValue,
    selfClosing: VOID_ELEMENTS.includes(tagName),
    indent,
    attributes: Array.from(node.attributes || []).map(({ name, value }) => ({ name, value })),
  };
}
