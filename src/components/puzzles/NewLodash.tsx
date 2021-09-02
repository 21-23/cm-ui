// YOLO: on

import { FunctionalComponent, h } from 'preact';

import type { NewPuzzleStateType } from '../../types/types';

type NewLodashPropsType = {
  state: NewPuzzleStateType,
  onChange: (state: NewPuzzleStateType) => void,
};

const NewLodash: FunctionalComponent<NewLodashPropsType> = () => {
  return <div>NEW LODASH</div>;
}

export default NewLodash;
