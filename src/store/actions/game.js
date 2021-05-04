import {calculateWinner} from '../../helpers/helpers';
import {GAME_JUMP_TO, GAME_SAVE_HISTORY, GAME_SET_PLAYER_SIDE, GAME_SET_STATE, GAME_TOGGLE_SORT} from './actionType';

export function gameSquareClick(coordinates) {
   console.log(coordinates);
   return (dispatch, getState) => {
      const state = getState().game;
      const history = state.history.slice(0, state.stepNumber + 1); // delete all "future" history.
      const current = history[history.length - 1];
      const squares = current.squares.slice();

      if (calculateWinner(squares) || squares[coordinates.split(':')[0]][coordinates.split(':')[1]]) {
         return;
      }

      const splitCoordinates = coordinates.split(':');

      let squaresRowCopy = squares[splitCoordinates[0]].concat();
      squaresRowCopy[splitCoordinates[1]] = state.xIsNext ? 'X' : 'O';
      squares[splitCoordinates[0]] = squaresRowCopy;

      dispatch(gameSetState(
         history.concat([{
            squares,
            coordinates,
            select: false
         }])
      ));

      dispatch(highlightHistoryButton());
   };
}

export function gameSetState(history) {
   return {
      type: GAME_SET_STATE,
      history
   };
}

export function gameToggleSort() {
   return {
      type: GAME_TOGGLE_SORT
   };
}

export function gameJumpTo(step) {
   return {
      type: GAME_JUMP_TO,
      step
   };
}

export function highlightHistoryButton(move) {
   return (dispatch, getState) => {
      const state = getState().game;
      const history = [...state.history];
      history.forEach((item, index) => {
         item.select = move === index;
      });

      dispatch(saveGameHistory(history));
   };
}

export function saveGameHistory(history) {
   return {
      type: GAME_SAVE_HISTORY,
      history
   };
}

export function gameSetPlayerSide(playerSide) {
   return {
      type: GAME_SET_PLAYER_SIDE,
      playerSide
   };
}