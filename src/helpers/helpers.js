export function calculateWinner(squares) {
   // const lines = [
   //    [0, 1, 2],
   //    [3, 4, 5],
   //    [6, 7, 8],
   //    [0, 3, 6],
   //    [1, 4, 7],
   //    [2, 5, 8],
   //    [0, 4, 8],
   //    [2, 4, 6]
   // ];

   const fieldSize = 3;
   const lines = [];
   let index = 0;
   for (let i = 0; i < (fieldSize * 2 + 2); i++) {
      const row = [];
      if (index === fieldSize) index = 0;

      // TODO: add fn for
      for (let j = 0; j < fieldSize; j++) {
         if (i < fieldSize) {
            row.push(`${index}:${j}`);
         } else if (i >= fieldSize && i < (fieldSize * 2)) {
            row.push(`${j}:${index}`);
         } else if (i === (fieldSize * 2)) {
            row.push(`${j}:${j}`);
         } else {
            row.push(`${j}:${2 - j}`);
         }

      }
      index++;
      lines.push(row);
   }
   // console.log('auto', lines);

   // const lines = [
   //    ['0:0', '0:1', '0:2'],
   //    ['1:0', '1:1', '1:2'],
   //    ['2:0', '2:1', '2:2'],
   //    ['0:0', '1:0', '2:0'],
   //    ['0:1', '1:1', '2:1'],
   //    ['0:2', '1:2', '2:2'],
   //    ['0:0', '1:1', '2:2'],
   //    ['0:2', '1:1', '2:0']
   // ];


   // for (let i = 0; i < lines.length; i++) {
   //    const [a, b, c] = lines[i];
   //    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
   //       return {
   //          text: 'Winner: ' + squares[a],
   //          coordinates: lines[i]
   //       };
   //    }
   // }

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

   // for (let i = 0; i < 3; i++) {
   //
   // }
   // TODO: add fn if
   if (!squares[0].includes(null) && !squares[1].includes(null) && !squares[2].includes(null)) {
      return {text: 'Draw'};
   }

   return null;
}

// export function getCoordinates(index) {
//    switch (index) {
//       case 0:
//          return '1:1';
//       case 1:
//          return '1:2';
//       case 2:
//          return '1:3';
//       case 3:
//          return '2:1';
//       case 4:
//          return '2:2';
//       case 5:
//          return '2:3';
//       case 6:
//          return '3:1';
//       case 7:
//          return '3:2';
//       case 8:
//          return '3:3';
//       default:
//          return null;
//    }
// }