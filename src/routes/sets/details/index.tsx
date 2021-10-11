// YOLO: on

import { FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import Set from '../../../components/sets/Set';
import type { FullSetType } from '../../../types/types';
import { fetchFullSet } from '../../../services/set';

type SetDetailsPropsType = {
  setId: string,
};
const SetDetails: FunctionalComponent<SetDetailsPropsType> = ({ setId }) => {
  const [set, setSet] = useState<FullSetType | null>(null);

  useEffect(() => {
    if (!setId) {
      return;
    }

    async function getPuzzle() {
      try {
        const set = await fetchFullSet(setId);
        setSet(set);
      } catch(error) {
        alert(JSON.stringify(error));
      }
    }

    getPuzzle();
  }, []);

  return (
    <div>
      <Set set={set} />
    </div>
  );
}

export default SetDetails;
