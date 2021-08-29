// YOLO: on

import { h } from 'preact';

import style from './NewCss.css';

// TODO:
// self-closing tags, e.g. <br></br> === <br /><br />
// validation (banned char, solution+input change)
// expected = solution(input)  -->> move to state as `expected`

export default function NewCss({ state, onChange }) {
  function onNameChange(event) {
    onChange({ ...state, name: event.target.value });
  }

  function onBannedChange(event) {
    const { value } = event.target;
    try {
      const banned = JSON.parse(value);
      onChange({ ...state, banned });
    } catch {
      console.log('Failed to parse `Banned characters`');
    }
  }

  function onSolutionChange(event) {
    onChange({ ...state, solution: event.target.value });
  }

  function onInputChange(event) {
    onChange({ ...state, input: event.target.value });
  }

  return (
    <div>
      <div class={style.name}>
        <div>Name:</div>
        <input value={state?.name || ''} onInput={onNameChange} />
      </div>
      <div class={style.banned}>
        <div>Banned characters (JSON array):</div>
        <input value={JSON.stringify(state?.banned || [])} onInput={onBannedChange} placeholder={'[",", "+", "d"]'} />
      </div>
      <div class={style.solution}>
        <div>Solution:</div>
        <input value={state?.solution || ''} onInput={onSolutionChange} />
      </div>
      <div class={style.input}>
        <div>Input:</div>
        <textarea value={state?.input || ''} onInput={onInputChange} rows="5" cols="50" />
        <MarkupRenderer input={state?.input || ''} solution={state?.solution || ''} />
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
    <pre>
      {lines.map((line, index) => {
        return <Line line={line} key={index} selected={selected.includes(line.qdId)} />
      })}
    </pre>
  );
}

function Line({ line, selected }) {
  return <div class={selected ? style.lineSelected : style.line}>
    <span>{'  '.repeat(line.indent)}</span>
    {
      line.qdId >= 0
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
          {'>'}
        </span>
      : <span>{'</'}<span>{line.tagName}</span>{'>'}</span>
    }
  </div>
}

function nodesToLines(nodes, indent = 0) {
  const lines = [];

  nodes.forEach((node, index) => {
    const qdId = `${indent * 50 + index  }`; // we don't expect more than 50 sibling elements
    lines.push(nodeToLine(node, qdId, indent));
    node.setAttribute('data-qdid', qdId);
    if (node.children.length > 0) {
      lines.push(...nodesToLines(Array.from(node.children), indent + 1));
    }
    lines.push(nodeToLine(node, -1, indent));
  });

  return lines;
}

function nodeToLine(node, qdId, indent) {
  return {
    qdId,
    tagName: node.tagName.toLowerCase(),
    indent,
    attributes: Array.from(node.attributes).map(({ name, value }) => ({ name, value })),
  };
}
