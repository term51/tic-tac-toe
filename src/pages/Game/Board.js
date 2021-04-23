import React from 'react';
import Square from './Square';
import {GAME_FIELD} from '../../settings';


export default class Board extends React.Component {

   renderSquare(i) {
      console.log();
      const backgroundColor = {};
      if (this.props.squares.winner) {
         if (this.props.squares.winner.includes(i)) {
            backgroundColor.background = 'blue';
         }
      }

      return <Square
         key={i}
         value={this.props.squares[i]}
         onClick={() => this.props.onClick(i)}
         background={backgroundColor}
      />;
   };

   render() {
      return (
         <div>
            {[...Array(GAME_FIELD.rows).keys()].map((row) => (
               <div className="board-row" key={row}>
                  {[...Array(GAME_FIELD.cells).keys()].map(cell => this.renderSquare(row * GAME_FIELD.cells + cell))}
               </div>
            ))}
         </div>
      );
   }
};
