import React from 'react';
import Square from './Square';
import {FIELD_SIZES} from '../../config';


const Board = props => {
   function renderSquare(i) {
      let winner = false;
      if (props.winnerCoordinates) {
         if (props.winnerCoordinates.includes(i)) {
            winner = true;
         }
      }

      return <Square
         key={i}
         value={props.squares[i]}
         onSquareClick={() => props.onSquareClick(i)}
         winner={winner}
      />;
   }

//TODO  change FIELD_SIZES[0]
   return (
      <div>
         {[...Array(FIELD_SIZES[0].rows).keys()].map((row) => (
            <div className="board-row" key={row}>
               {[...Array(FIELD_SIZES[0].cells).keys()].map(cell => renderSquare(row * FIELD_SIZES[0].cells + cell))}
            </div>
         ))}
      </div>
   );
};
export default Board;