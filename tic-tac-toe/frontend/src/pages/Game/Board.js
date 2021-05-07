import React from 'react';
import Square from './Square';

const Board = props => {
   function renderSquare(coordinates) {
      let winner = false;
      if (props.winnerCoordinates) {
         if (props.winnerCoordinates.includes(coordinates)) {
            winner = true;
         }
      }

      const splitCoordinates = coordinates.split(':');
      const value = props.squares[splitCoordinates[0]][splitCoordinates[1]];

      return <Square
         key={coordinates}
         value={value}
         onSquareClick={() => props.onSquareClick(coordinates)}
         winner={winner}
      />;
   }

   return (
      <div>
         {[...Array(props.fieldSize).keys()].map((row) => (
            <div className="board-row" key={row}>
               {[...Array(props.fieldSize).keys()].map(cell => renderSquare(`${row}:${cell}`))}
            </div>
         ))}
      </div>
   );
};
export default Board;