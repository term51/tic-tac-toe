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

      for (let i = 0; i < lines.length; i++) {
         if (isFoundWinningLine(squares, lines[i])) {
            return {
               text: 'Winner: ' + squares[lines[i][0].split(':')[0]][lines[i][0].split(':')[1]],
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

// TODO refactor
function isFoundWinningLine(squares, line) {

   if (squares.length === 3) {
      const [a, b, c] = line;
      const splitA = a.split(':');
      const splitB = b.split(':');
      const splitC = c.split(':');

      return squares[splitA[0]][splitA[1]]
         && squares[splitA[0]][splitA[1]]
         === squares[splitB[0]][splitB[1]]
         && squares[splitA[0]][splitA[1]]
         === squares[splitC[0]][splitC[1]];

   } else if (squares.length === 4) {
      const [a, b, c, d] = line;
      const splitA = a.split(':');
      const splitB = b.split(':');
      const splitC = c.split(':');
      const splitD = d.split(':');

      return squares[splitA[0]][splitA[1]]
         && squares[splitA[0]][splitA[1]]
         === squares[splitB[0]][splitB[1]]
         && squares[splitA[0]][splitA[1]]
         === squares[splitC[0]][splitC[1]]
         && squares[splitA[0]][splitA[1]]
         === squares[splitD[0]][splitD[1]];

   } else {
      const [a, b, c, d, e] = line;
      const splitA = a.split(':');
      const splitB = b.split(':');
      const splitC = c.split(':');
      const splitD = d.split(':');
      const splitE = e.split(':');

      return squares[splitA[0]][splitA[1]]
         && squares[splitA[0]][splitA[1]]
         === squares[splitB[0]][splitB[1]]
         && squares[splitA[0]][splitA[1]]
         === squares[splitC[0]][splitC[1]]
         && squares[splitA[0]][splitA[1]]
         === squares[splitD[0]][splitD[1]]
         && squares[splitA[0]][splitA[1]]
         === squares[splitE[0]][splitE[1]];
   }


}
// TODO refactor
function isDraw(squares) {
   if (squares.length === 3) {
      return !squares[0].includes(null)
         && !squares[1].includes(null)
         && !squares[2].includes(null);
   } else if (squares.length === 4) {
      return !squares[0].includes(null)
         && !squares[1].includes(null)
         && !squares[2].includes(null)
         && !squares[3].includes(null);
   } else {
      return !squares[0].includes(null)
         && !squares[1].includes(null)
         && !squares[2].includes(null)
         && !squares[3].includes(null)
         && !squares[4].includes(null);
   }

}