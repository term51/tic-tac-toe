import {VICTORY_SET_LIST_OF_WINNING_LINES} from './actionType';

export function createListOfWinningLines() {
   return (dispatch, getState) => {
      const state = getState().settings;
      const fieldSize = state.fieldSize;

      const lines = [];
      let rowIndex = 0;
      const maxWays = fieldSize * 2 + 2;

      for (let lineIndex = 0; lineIndex < maxWays; lineIndex++) {
         if (rowIndex === fieldSize) rowIndex = 0;
         lines.push(makeRow(fieldSize, rowIndex, lineIndex));
         rowIndex++;
      }
      console.log('lines', lines);
      dispatch(setListOfWinningLines(lines));
   };
}


function makeRow(fieldSize, rowIndex, lineIndex) {
   const row = [];
   for (let cellIndex = 0; cellIndex < fieldSize; cellIndex++) {
      row.push(makeCells(fieldSize, rowIndex, cellIndex, lineIndex));
   }
   return row;
}

function makeCells(fieldSize, rowIndex, cellIndex, lineIndex) {
   if (lineIndex < fieldSize) {
      return `${rowIndex}:${cellIndex}`;
   } else if (lineIndex >= fieldSize && lineIndex < (fieldSize * 2)) {
      return `${cellIndex}:${rowIndex}`;
   } else if (lineIndex === (fieldSize * 2)) {
      return `${cellIndex}:${cellIndex}`;
   } else {
      return `${cellIndex}:${(fieldSize - 1) - cellIndex}`;
   }
}

export function setListOfWinningLines(listOfWinningLines) {
   return {
      type: VICTORY_SET_LIST_OF_WINNING_LINES,
      listOfWinningLines
   };
}