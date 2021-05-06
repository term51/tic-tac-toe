
export function calculateWinner(squares) {
   const fieldSize = 3;
   const lines = [];
   let rowIndex = 0;
   const maxWays = fieldSize * 2 + 2;

   for (let wayIndex = 0; wayIndex < maxWays; wayIndex++) {
      if (rowIndex === fieldSize) rowIndex = 0;
      lines.push(makeRow(fieldSize, rowIndex, wayIndex));
      rowIndex++;
   }





   for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      // TODO: add fn if
      if (
         squares[a.split(':')[0]][a.split(':')[1]]
         && squares[a.split(':')[0]][a.split(':')[1]]
         === squares[b.split(':')[0]][b.split(':')[1]]
         && squares[a.split(':')[0]][a.split(':')[1]]
         === squares[c.split(':')[0]][c.split(':')[1]]
      ) {
         return {
            text: 'Winner: ' + squares[a.split(':')[0]][a.split(':')[1]],
            coordinates: lines[i]
         };
      }
   }

   // TODO: add fn if
   if (!squares[0].includes(null) && !squares[1].includes(null) && !squares[2].includes(null)) {
      return {text: 'Draw'};
   }

   return null;
}



function makeRow(fieldSize, rowIndex, wayIndex) {
   const row = [];
   // TODO: add fn for
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
// [
//    ['0:0', '0:1', '0:2'],
//    ['1:0', '1:1', '1:2'],
//    ['2:0', '2:1', '2:2'],
//    ['0:0', '1:0', '2:0'],
//    ['0:1', '1:1', '2:1'],
//    ['0:2', '1:2', '2:2'],
//    ['0:0', '1:1', '2:2'],
//    ['0:2', '1:1', '2:0']
// ];