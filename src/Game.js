import React from 'react';
import Board from './Board';
import {calculateWinner, getCoordinates} from './helpers';
import {FaSortAmountDown, FaSortAmountDownAlt} from 'react-icons/all';

export default class Game extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         history: [{
            squares: Array(9).fill(null),
            coordinates: null,
            select: false
         }],
         xIsNext: true,
         stepNumber: 0,
         isReverseSort: false
      };
   }

   handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1); // delete all "future" history.
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
         return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
         history: history.concat([{
            squares,
            coordinates: getCoordinates(i),
            select: false
         }]),
         stepNumber: history.length,
         xIsNext: !this.state.xIsNext
      });
   }

   jumpTo(step) {
      this.setState({
         stepNumber: step,
         xIsNext: (step % 2) === 0
      });
   }

   paintButton(move) {
      const history = this.state.history.concat();
      history.forEach((item, index) => {
         item.select = move === index;
      });

      this.setState({
         history
      });
   }

   toggleSort() {
      this.setState({
         isReverseSort: !this.state.isReverseSort
      });
   }

   render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);

      const moves = history.map((step, move) => {
         const desc = move
            ? 'Go to move #' + move
            : 'Go to game start';
         return (
            <li key={move}>
               {step.coordinates}
               <button onClick={() => {
                  this.jumpTo(move);
                  this.paintButton(move);
               }}
                       style={step.select ? {backgroundColor: 'aqua'} : null}
               >{desc}</button>
            </li>
         );
      });

      let status;
      if (winner) {
         status = winner.text;
         if (winner.coordinates) {
            current.squares.winner = winner.coordinates;
         }
      } else {
         status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }


      const historyClasses = ['history-list'];

      if (this.state.isReverseSort) {
         historyClasses.push('history-reverse');
      }

      return (
         <div className="game">
            <div className="game-board">
               <Board
                  squares={current.squares}
                  onClick={(i) => this.handleClick(i)}
               />
            </div>
            <div className="game-info">
               <button className="btn-sort" onClick={() => this.toggleSort()}>
                  {this.state.isReverseSort ? <FaSortAmountDown/> : <FaSortAmountDownAlt/>}
               </button>
               <div>{status}</div>
               <ol className={historyClasses.join(' ')}>{moves}</ol>
            </div>
         </div>
      );
   }
}