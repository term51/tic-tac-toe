import React from 'react';
import Square from './Square';
// import {FIELD_SIZES} from '../../config';


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
         // key={i}
         value={value}
         // value={props.squares[i]}
         onSquareClick={() => props.onSquareClick(coordinates)}
         // onSquareClick={() => props.onSquareClick(i)}
         winner={winner}
      />;
   }

//TODO  change FIELD_SIZES[0]
   return (
      <div>
         {[...Array(props.fieldSize).keys()].map((row) => (
            <div className="board-row" key={row}>
               {[...Array(props.fieldSize).keys()].map(cell => renderSquare(`${row}:${cell}`))}
               {/*{[...Array(props.fieldSize).keys()].map(cell => renderSquare(row * props.fieldSize + cell))}*/}
            </div>
         ))}
      </div>
   );
};
export default Board;