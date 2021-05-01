import {calculateWinner, getCoordinates} from '../../helpers/helpers';
import {GAME_JUMP_TO, GAME_SAVE_HISTORY, GAME_SET_STATE, GAME_TOGGLE_SORT} from './actionType';

// export function gameSquareClick(i) {
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

      // squares[i] = state.xIsNext ? 'X' : 'O';
      // squares[parseInt(splitCoordinates[0])][parseInt(splitCoordinates[1])] = state.xIsNext ? 'X' : 'O';
      let squaresRowCopy = squares[splitCoordinates[0]].concat();
      squaresRowCopy[splitCoordinates[1]] = state.xIsNext ? 'X' : 'O';
      squares[splitCoordinates[0]] = squaresRowCopy;

      dispatch(gameSetState(
         history.concat([{
            squares,
            // coordinates: getCoordinates(i),
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

// export function AITurn() {
//    return (dispatch, getState) => {
//       console.log('AI turn');
//       const state = getState().game;
//       const AIAvailableMoves = [];
//       const current = state.history[state.stepNumber];
//
//       for (let ii = 0; ii < current.squares.length; ii++) {
//          if (current.squares[ii] === null) {
//             AIAvailableMoves.push(ii);
//          }
//       }
//
//       console.log('AIAvailableMoves', AIAvailableMoves);
//
//       if (AIAvailableMoves.length > 0) {
//          let AIChoice = Math.round(Math.random() * AIAvailableMoves.length);
//          console.log('AIChoice index', AIChoice);
//
//          dispatch(gameSquareClick(AIAvailableMoves[AIChoice]));
//       }
//    };
// }