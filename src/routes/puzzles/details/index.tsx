// YOLO: on

import { FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import Puzzle from '../../../components/puzzles/Puzzle';
import type { FullPuzzleType } from '../../../types/types';
import { fetchPuzzle } from '../../../services/puzzle';

type PuzzleDetailsPropsType = {
  puzzleId: string,
};
const PuzzleDetails: FunctionalComponent<PuzzleDetailsPropsType> = ({ puzzleId }) => {
  const [puzzle, setPuzzle] = useState<FullPuzzleType | null>(null);

  useEffect(() => {
    if (!puzzleId) {
      return;
    }

    async function getPuzzle() {
      try {
        const puzzle = await fetchPuzzle(puzzleId);
        setPuzzle(puzzle);
      } catch(error) {
        alert(JSON.stringify(error));
      }
    }

    getPuzzle();
  }, []);

  return (
    <div>
      <Puzzle puzzle={puzzle} />
    </div>
  );
}

export default PuzzleDetails;
