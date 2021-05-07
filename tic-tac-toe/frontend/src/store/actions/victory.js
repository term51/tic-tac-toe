import {VICTORY_SET_LIST_OF_WINNING_LINES} from './actionType';

/*
* Creates an array of possible winning lines based on the size of the field, like this one:
[
   ['0:0', '0:1', '0:2'],
   ['1:0', '1:1', '1:2'],
   ['2:0', '2:1', '2:2'],
   ['0:0', '1:0', '2:0'],
   ['0:1', '1:1', '2:1'],
   ['0:2', '1:2', '2:2'],
   ['0:0', '1:1', '2:2'],
   ['0:2', '1:1', '2:0']
];
*/
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

export function calculateWinner(squares) {
   return (dispatch, getState) => {
      const state = getState().victory;
      const lines = state.listOfWinningLines;


      // TODO: передедаь весь метод под большое число ячеек, abc уже не подходит
      for (let i = 0; i < lines.length; i++) {
         const [a, b, c] = lines[i];
         if (isFoundWinningLine(squares, a, b, c)) {
            return {
               text: 'Winner: ' + squares[a.split(':')[0]][a.split(':')[1]],
               coordinates: lines[i]
            };
         }
      }

      if (isDraw(squares)) {
         return {text: 'Draw'};
      }
      return null;
   };
}

function isFoundWinningLine(squares, a, b, c) {
   const splitA = a.split(':');
   const splitB = b.split(':');
   const splitC = c.split(':');

   return squares[splitA[0]][splitA[1]]
      && squares[splitA[0]][splitA[1]]
      === squares[splitB[0]][splitB[1]]
      && squares[splitA[0]][splitA[1]]
      === squares[splitC[0]][splitC[1]];
}

// TODO 4x4 5x5
function isDraw(squares) {
   return !squares[0].includes(null) && !squares[1].includes(null) && !squares[2].includes(null);
}