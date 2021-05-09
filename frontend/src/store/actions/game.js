import {
   GAME_JUMP_TO, GAME_SAVE_HISTORY, GAME_SET_PLAYER_SIDE, GAME_MAKE_MOVE,
   GAME_TOGGLE_SORT, GAME_RESET_STATE, GAME_APP_IS_CONFIGURED
} from './actionType';
import {FIRST_PLAYER, FIVE_BY_FIVE, FOUR_BY_FOUR, SECOND_PLAYER, THREE_BY_THREE} from '../../constants';
import {calculateWinner, createListOfWinningLines} from './victory';

export function gameFirstRunConfiguration() {
   return (dispatch, getState) => {
      const state = getState();
      const fieldSize = state.settings.fieldSize;
      const history = state.game.history;
      history[0].squares = getArrayOfNullValuesByFieldSize(fieldSize);
      dispatch(gameSaveHistory(history));
      dispatch(createListOfWinningLines());
      dispatch(appIsConfigured());
   };
}

export function appIsConfigured() {
   return {
      type: GAME_APP_IS_CONFIGURED
   };
}

export function gameSquareClick(coordinates) {
   return (dispatch, getState) => {
      const state = getState().game;
      const history = deleteFutureHistory(state);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (dispatch(calculateWinner(squares)) || isNotNullSquare(squares, coordinates)) {
         return;
      }
      dispatch(markThePlayerCell(squares, coordinates));

      dispatch(gameMakeMove(history.concat([{
            squares, coordinates,
            select: false
         }])
      ));

      dispatch(gameHighlightHistoryButton());
   };
}

function markThePlayerCell(squares, coordinates) {
   return (dispatch, getState) => {
      const state = getState().game;
      const splitCoordinates = coordinates.split(':');
      const squaresRowCopy = squares[splitCoordinates[0]].concat();
      squaresRowCopy[splitCoordinates[1]] = state.xIsNext ? FIRST_PLAYER : SECOND_PLAYER;
      squares[splitCoordinates[0]] = squaresRowCopy;
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

export function gameHighlightHistoryButton(move) {
   return (dispatch, getState) => {
      const state = getState().game;
      const history = [...state.history];
      history.forEach((item, index) => {
         item.select = move === index;
      });

      dispatch(gameSaveHistory(history));
   };
}

export function gameSaveHistory(history) {
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

export function gameChangeFieldSize() {
   return (dispatch, getState) => {
      const state = getState();
      const history = [{
         squares: [],
         coordinates: null,
         select: false
      }];
      const fieldSize = state.settings.fieldSize;
      history[0].squares = getArrayOfNullValuesByFieldSize(fieldSize);
      dispatch(gameResetState(history));
   };
}

function getArrayOfNullValuesByFieldSize(size) {
   if (size === FOUR_BY_FOUR) {
      return Array(FOUR_BY_FOUR).fill(Array(FOUR_BY_FOUR).fill(null));
   }
   if (size === FIVE_BY_FIVE) {
      return Array(FIVE_BY_FIVE).fill(Array(FIVE_BY_FIVE).fill(null));
   }
   return Array(THREE_BY_THREE).fill(Array(THREE_BY_THREE).fill(null));
}

export function gameResetState(history) {
   return {
      type: GAME_RESET_STATE,
      history
   };
}