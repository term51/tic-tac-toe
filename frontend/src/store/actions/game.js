
import {GAME_JUMP_TO, GAME_SAVE_HISTORY, GAME_SET_PLAYER_SIDE, GAME_MAKE_MOVE, GAME_TOGGLE_SORT} from './actionType';
import {FIRST_PLAYER, SECOND_PLAYER} from '../../constants';
import {calculateWinner} from './victory';

export function gameSquareClick(coordinates) {
   return (dispatch, getState) => {
      const state = getState().game;
      const history = deleteFutureHistory(state);
      const current = history[history.length - 1];
      const squares = current.squares.slice();

      if (dispatch(calculateWinner(squares)) || isNotNullSquare(squares, coordinates)) {
         return;
      }

      const splitCoordinates = coordinates.split(':');

      let squaresRowCopy = squares[splitCoordinates[0]].concat();

      squaresRowCopy[splitCoordinates[1]] = state.xIsNext ? FIRST_PLAYER : SECOND_PLAYER;
      squares[splitCoordinates[0]] = squaresRowCopy;

      dispatch(gameMakeMove(
         history.concat([{
            squares,
            coordinates,
            select: false
         }])
      ));

      dispatch(highlightHistoryButton());
   };
}

function deleteFutureHistory(state) {
   return state.history.slice(0, state.stepNumber + 1);
}

function isNotNullSquare(squares, coordinates) {
   const splitCoordinates = coordinates.split(':');
   return squares[splitCoordinates[0]][splitCoordinates[1]];
}

export function gameMakeMove(history) {
   return {
      type: GAME_MAKE_MOVE,
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

export function gameChangePlayerSide(playerSide) {
   return (dispatch, getState) => {
      const state = getState();
      state.AI.AIPlayer = playerSide === SECOND_PLAYER ? FIRST_PLAYER : SECOND_PLAYER;
      state.AI.Player = playerSide;
      dispatch(gameSetPlayerSide(playerSide));
   };
}

export function gameSetPlayerSide(playerSide) {
   return {
      type: GAME_SET_PLAYER_SIDE,
      playerSide
   };
}