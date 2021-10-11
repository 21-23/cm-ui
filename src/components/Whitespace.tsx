import { FunctionalComponent, h } from 'preact';

type WhitespacePropsType = {
  width: string,
  height: string,
};
export const Whitespace: FunctionalComponent<WhitespacePropsType> = ({ width, height }) => {
  return <div style={{ width, height }}></div>;
}

export const Whitespace16: FunctionalComponent = () => {
  return <Whitespace width="16px" height="0px" />
}

export const Whitespace8: FunctionalComponent = () => {
  return <Whitespace width="8px" height="0px" />
}
