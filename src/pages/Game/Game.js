import React from 'react';
import classes from './Game.module.scss';
import GameLayout from '../../hoc/layouts/Game/GameLayout';
import Board from './Board';
import {connect} from 'react-redux';
import {gameSquareClick, gameJumpTo, gameToggleSort, highlightHistoryButton} from '../../store/actions/game';
import SortButton from './SortButton';
import Status from './Status';
import Moves from './Moves';
import {calculateWinner} from '../../helpers/helpers';
import Side from './Side/Side';

class Game extends React.Component {
   render() {
      const history = this.props.history;
      const current = history[this.props.stepNumber];
      const winner = calculateWinner(current.squares);

      return (
         <GameLayout>
            <div className={classes.Game}>
               <div className="game-board">
                  <Board
                     fieldSize={this.props.fieldSize}
                     squares={current.squares}
                     onSquareClick={this.props.gameSquareClick}
                     winnerCoordinates={winner?.coordinates}
                  />
               </div>
               <div className="game-info">
                  {this.props.gameMode === 2 ? <Side/> : null}
                  <SortButton
                     isReverseSort={this.props.isReverseSort}
                     onToggleSort={this.props.gameToggleSort}
                  />
                  <Status
                     currentSquires={current.squares}
                     xIsNext={this.props.xIsNext}
                  />
                  <Moves
                     onJumpTo={this.props.gameJumpTo}
                     onHighlight={this.props.highlightHistoryButton}
                     history={this.props.history}
                     isReverseSort={this.props.isReverseSort}
                  />
               </div>
            </div>
         </GameLayout>
      );
   }
}

function mapStateToProps({game, settings}) {
   return {
      history: game.history,
      xIsNext: game.xIsNext,
      stepNumber: game.stepNumber,
      isReverseSort: game.isReverseSort,
      gameMode: settings.gameMode,
      fieldSize: settings.fieldSize
   };
}

function mapDispatchToProps(dispatch) {
   return {
      gameSquareClick: coordinates => dispatch(gameSquareClick(coordinates)),
      gameToggleSort: () => dispatch(gameToggleSort()),
      gameJumpTo: (step) => dispatch(gameJumpTo(step)),
      highlightHistoryButton: (move) => dispatch(highlightHistoryButton(move))
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);