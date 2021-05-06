import {VICTORY_SET_LIST_OF_WINNING_LINES} from './actionType';

export function getListOfWinningLines() {
   return (dispatch, getState) => {
      const state = getState().settings;
      const fieldSize = state.fieldSize;

      const lines = [];
      let rowIndex = 0;
      const maxWays = fieldSize * 2 + 2;

      for (let wayIndex = 0; wayIndex < maxWays; wayIndex++) {
         if (rowIndex === fieldSize) rowIndex = 0;
         lines.push(makeRow(fieldSize, rowIndex, wayIndex));
         rowIndex++;
      }
      dispatch(setListOfWinningLines(lines));
   };
}


function makeRow(fieldSize, rowIndex, wayIndex) {
   const row = [];
   for (let cellIndex = 0; cellIndex < fieldSize; cellIndex++) {
      row.push(makeCells(fieldSize, rowIndex, cellIndex, wayIndex));
   }
   return row;
}

function makeCells(fieldSize, rowIndex, cellIndex, wayIndex) {
   if (wayIndex < fieldSize) {
      return `${rowIndex}:${cellIndex}`;
   } else if (wayIndex >= fieldSize && wayIndex < (fieldSize * 2)) {
      return `${cellIndex}:${rowIndex}`;
   } else if (wayIndex === (fieldSize * 2)) {
      return `${cellIndex}:${cellIndex}`;
   } else {
      return `${cellIndex}:${2 - cellIndex}`;
   }
}

export function setListOfWinningLines(listOfWinningLines) {
   return {
      type: VICTORY_SET_LIST_OF_WINNING_LINES,
      listOfWinningLines
   };
}