import React from 'react';
import classes from './Game.module.scss';
import GameLayout from '../../hoc/layouts/Game/GameLayout';
import Board from './Board';
import {connect} from 'react-redux';
import {
   gameSquareClick,
   gameJumpTo,
   gameToggleSort,
   gameHighlightHistoryButton,
   gameChangePlayerSide, gameFirstRunConfiguration
} from '../../store/actions/game';
import SortButton from './SortButton';
import Status from './Status';
import Moves from './Moves';
import Side from './Side';
import {PLAYER_VS_AI_MODE} from '../../constants';
import {calculateWinner} from '../../store/actions/victory';

class Game extends React.Component {
   constructor(props) {
      super(props);
      if (!this.props.isAppConfigured) {
         this.props.gameFirstRunConfiguration();
      }
   }

   render() {
      const history = this.props.history;
      const current = history[this.props.stepNumber];
      const winner = this.props.victoryCalculateWinner(current.squares);

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
                  {
                     this.props.gameMode === PLAYER_VS_AI_MODE
                        ? <Side
                           playerSide={this.props.playerSide}
                           disabled={this.props.stepNumber > 0}
                           onChangePlayerSide={this.props.gameChangePlayerSide}
                        />
                        : null
                  }
                  <SortButton
                     isReverseSort={this.props.isReverseSort}
                     onToggleSort={this.props.gameToggleSort}
                  />
                  <Status
                     winner={winner}
                     xIsNext={this.props.xIsNext}
                  />
                  <Moves
                     onJumpTo={this.props.gameJumpTo}
                     onHighlight={this.props.gameHighlightHistoryButton}
                     history={this.props.history}
                     isReverseSort={this.props.isReverseSort}
                  />
               </div>
            </div>
         </GameLayout>
      );
   }
}

function mapStateToProps({game, settings, victory}) {
   return {
      history: game.history,
      xIsNext: game.xIsNext,
      stepNumber: game.stepNumber,
      isReverseSort: game.isReverseSort,
      playerSide: game.playerSide,
      isAppConfigured: game.isAppConfigured,
      gameMode: settings.gameMode,
      fieldSize: settings.fieldSize,
      listOfWinningLines: victory.listOfWinningLines
   };
}

function mapDispatchToProps(dispatch) {
   return {
      gameSquareClick: coordinates => dispatch(gameSquareClick(coordinates)),
      gameToggleSort: () => dispatch(gameToggleSort()),
      gameJumpTo: (step) => dispatch(gameJumpTo(step)),
      gameFirstRunConfiguration: () => dispatch(gameFirstRunConfiguration()),
      gameHighlightHistoryButton: (move) => dispatch(gameHighlightHistoryButton(move)),
      gameChangePlayerSide: (side) => dispatch(gameChangePlayerSide(side)),
      victoryCalculateWinner: (squares) => dispatch(calculateWinner(squares))
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);