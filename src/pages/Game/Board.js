import React from 'react';
import Square from './Square';
import {GAME_FIELD} from '../../settings';


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

   return (
      <div>
         {[...Array(GAME_FIELD.rows).keys()].map((row) => (
            <div className="board-row" key={row}>
               {[...Array(GAME_FIELD.cells).keys()].map(cell => renderSquare(row * GAME_FIELD.cells + cell))}
            </div>
         ))}
      </div>
   );
};
export default Board;