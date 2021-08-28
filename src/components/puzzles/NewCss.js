// YOLO: on

import { h } from 'preact';
import { useState } from 'preact/hooks';

import style from './NewCss.css';

export default function NewCss({ state, onChange }) {
  const [lines, setLines] = useState([]);

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

  function onBannedChange(event) {
    const { value } = event.target;

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

  function onSolutionChange(event) {
    const { value } = event.target;

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

  function onInputChange(event) {
    const { value } = event.target;

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
          <textarea class={state?.input?.valid ? style.inputValid : style.inputInvalid} value={state?.input?.value || ''} onInput={onInputChange} rows="5" cols="50" />
          {state?.input?.message && <div class={style.errorMessage}>{state?.input?.message}</div>}
          <MarkupRenderer lines={lines} expected={state?.expected} />
        </div>
      </div>
      <div class={style.examples}>
      <div class={style.title}>Example</div>
        <div class={style.name}>
          <div class={style.propName}>Name:</div>
          <input value="Puzzle name" readonly="readonly" />
        </div>
        <div class={style.description}>
          <div class={style.propName}>Description:</div>
          <input value="Short description" readonly="readonly" />
        </div>
        <div class={style.banned}>
          <div class={style.propName}>Banned characters:</div>
          <input value={'["#", ","]'} readonly="readonly" />
        </div>
        <div class={style.solution}>
          <div class={style.propName}>Solution:</div>
          <input value=".spcl" readonly="readonly" />
        </div>
        <div class={style.input}>
          <div class={style.propName}>Input:</div>
          <textarea value={'<div><span class="spcl">content</span></div>'} readonly="readonly" rows="5" cols="50" />
        </div>
      </div>
    </div>
  );
}

function MarkupRenderer({ input, solution }) {
  const container = document.createElement('div');
  container.innerHTML = input;

  const lines = nodesToLines(Array.from(container.children));

  let selected = [];
  if (solution) {
    try {
      selected = Array.from(container.querySelectorAll(solution)).map((node) => node.dataset['qdid']);
    } catch (error) {
      console.log('Failed to run solution', error);
    }
  }

  return (
    <pre class={style.expected}>
      {lines.map((line, index) => {
        return <Line line={line} key={index} selected={expected.includes(line.qdId)} />
      })}
    </pre>
  );
}

function Line({ line, selected }) {
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

function nodesToLines(nodes, options, indent) {
  const lines = [];

  nodes.forEach((node) => {
    const qdId = `${++options.qdIdCounter}`;
    const line = nodeToLine(node, qdId, indent);
    lines.push(line);
    if (line.tagName === '#text') {
      return;
    }
    node.setAttribute('data-qdid', qdId);
    if (node.children.length > 0 || !line.selfClosing) {
      lines.push(...nodesToLines(Array.from(node.childNodes), options, indent + 1));
      lines.push(nodeToLine(node, '-1', indent));
    }
  });

  return lines;
}

// https://www.w3.org/TR/html51/syntax.html#void-elements
const VOID_ELEMENTS = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr'];

function nodeToLine(node, qdId, indent) {
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
