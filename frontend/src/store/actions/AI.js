import {
   AI_ADD_WAY_TO_LIST, AI_CLEAR_WAY_LIST,
   AI_SET_AI_PLAYER_UNITS,
   AI_SET_AVAILABLE_MOVES,
   AI_SET_CURRENT_INDEX,
   AI_SET_ENEMY,
   AI_SET_PLAYER_UNITS
} from './actionType';
import {AI_EASY, AI_HARD, AI_MEDIUM, FIRST_PLAYER, SECOND_PLAYER} from '../../constants';
import {gameSquareClick} from './game';

export function AIMakeMove() {
   return (dispatch, getState) => {
      dispatch(parseTheField());

      const state = getState();
      const AIPossibleMoves = state.AI.availableMoves;

      if (isAvailableMoves(AIPossibleMoves)) {
         const AIChoice = dispatch(AIMakeChoice());
         dispatch(gameSquareClick(AIPossibleMoves[AIChoice]));
      } else {
         console.log('No available moves!');
      }
      dispatch(clearWayList());
   };
}

function clearWayList() {
   return {
      type: AI_CLEAR_WAY_LIST
   };
}

// TODO: Shorten the method
function parseTheField() {
   return (dispatch, getState) => {
      const state = getState().game;
      const field = state.history[state.stepNumber].squares;
      const firstPlayerUnits = [], secondPlayerUnits = [], availableMoves = [];

      field.forEach((row, rowIndex) => {
         row.forEach((cell, cellIndex) => {
            if (cell === FIRST_PLAYER) {
               firstPlayerUnits.push({
                  coordinates: rowIndex + ':' + cellIndex,
                  ways: []
               });
            }
            if (cell === SECOND_PLAYER) {
               secondPlayerUnits.push({
                  coordinates: rowIndex + ':' + cellIndex,
                  ways: []
               });
            }
            if (cell === null) {
               availableMoves.push(`${rowIndex}:${cellIndex}`);
            }
         });
      });

      if (state.playerSide === FIRST_PLAYER) {
         dispatch(setPlayerUnits(firstPlayerUnits));
         dispatch(setAIPlayerUnits(secondPlayerUnits));
      } else {
         dispatch(setAIPlayerUnits(firstPlayerUnits));
         dispatch(setPlayerUnits(secondPlayerUnits));
      }
      dispatch(setAvailableMoves(availableMoves));
   };
}

function setAIPlayerUnits(playerUnits) {
   return {
      type: AI_SET_AI_PLAYER_UNITS,
      playerUnits
   };
}

function setPlayerUnits(playerUnits) {
   return {
      type: AI_SET_PLAYER_UNITS,
      playerUnits
   };
}

function setAvailableMoves(availableMoves) {
   return {
      type: AI_SET_AVAILABLE_MOVES,
      availableMoves
   };
}

function isAvailableMoves(moves) {
   return moves.length > 0;
}

function AIMakeChoice() {
   return (dispatch, getState) => {
      const state = getState();
      const availableMoves = state.AI.availableMoves;
      const AIDifficulty = state.settings.AIDifficulty;

      if (AIDifficulty === AI_EASY) return makeEasyChoice(availableMoves);
      if (isFirstTimeChoice(state.AI.AIPlayerUnits)) return dispatch(makeMoveInCenter(availableMoves));
      if (AIDifficulty === AI_MEDIUM) return dispatch(makeMediumChoice(availableMoves));
      if (AIDifficulty === AI_HARD) return dispatch(makeHardChoice(availableMoves));
   };
}

function isFirstTimeChoice(AIPlayerUnits) {
   return AIPlayerUnits.length === 0;
}

function makeEasyChoice(moves) {
   return getRandomChoice(moves);
}

function getRandomChoice(moves) {
   return Math.floor(Math.random() * moves.length);
}

function makeMoveInCenter(moves) {
   return (dispatch, getState) => {
      const state = getState();
      const field = state.game.history[state.game.stepNumber].squares;
      const center = getCenterCoordinates(state.settings.fieldSize);
      if (field[center][center] === null) {
         return moves.indexOf(`${center}:${center}`);
      }
      const cornerCoordinates = dispatch(getCornerCoordinates(moves));
      const randomIndex = getRandomChoice(cornerCoordinates);
      return moves.indexOf(cornerCoordinates[randomIndex]);
      // return getRandomChoice(moves);
   };
}

function getCornerCoordinates(moves) {
   return (dispatch, getState) => {
      const state = getState();
      const maxSize = state.settings.fieldSize - 1;
      const minSize = 0;
      const cornerCoordinates = [];
      moves.forEach(item => {
         const [row, cell] = item.split(':');
         if (
            (+row === minSize && +cell === minSize)
            || (+row === maxSize && +cell === maxSize)
            || (+row === minSize && +cell === maxSize)
            || (+row === maxSize && +cell === minSize)
         ) {
            cornerCoordinates.push(item);
         }

      });
      return cornerCoordinates;
   };
}

function getCenterCoordinates(fieldSize) {
   return Math.floor(fieldSize / 2);
}

function makeMediumChoice(moves) {
   return (dispatch, getState) => {
      const state = getState().AI;
      dispatch(getAllWays(state.AIPlayerUnits, state.Player));
      dispatch(calculateWaypoints(state.AIPlayerUnits));
      const bestPossibleMoves = dispatch(getWayWithMaximumPoints());

      for (let i = 0; i < bestPossibleMoves.length; i++) {
         if (moves.includes(bestPossibleMoves[i])) return moves.indexOf(bestPossibleMoves[i]);
      }
      return getRandomChoice(moves);
   };
}

function makeHardChoice(moves) {
   return (dispatch, getState) => {
      const state = getState().AI;
      // TODO оптимизировать при переносе в redux
      dispatch(getAllWays(state.AIPlayerUnits, state.Player));
      dispatch(getAllWays(state.PlayerUnits, state.AIPlayer));

      dispatch(calculateWaypoints(state.AIPlayerUnits));
      dispatch(calculateWaypoints(state.PlayerUnits));

      const bestPossibleMoves = dispatch(getWayWithMaximumPoints());

      for (let i = 0; i < bestPossibleMoves.length; i++) {
         if (moves.includes(bestPossibleMoves[i])) return moves.indexOf(bestPossibleMoves[i]);
      }

      return getRandomChoice(moves);
   };
}

function getAllWays(playerUnits, enemy) {
   return dispatch => {
      playerUnits.forEach(({coordinates}, index) => {
         dispatch(setEnemy(enemy));
         dispatch(setCurrentIndex(index));
         const splitCoordinate = coordinates.split(':');
         dispatch(getHorizontalWay(splitCoordinate[0]));
         dispatch(getVerticalWay(splitCoordinate[1]));
         dispatch(getFirstDiagonalWay(coordinates));
         dispatch(getSecondDiagonalWay(coordinates));
      });
   };

}

function setEnemy(enemy) {
   return {
      type: AI_SET_ENEMY,
      enemy
   };
}

function setCurrentIndex(currentIndex) {
   return {
      type: AI_SET_CURRENT_INDEX,
      currentIndex
   };
}

function getHorizontalWay(coordinates) {
   return (dispatch, getState) => {
      //TODO рефактор создать функцию для получения fieldsize
      const state = getState().settings;
      const fieldSize = state.fieldSize;
      const way = [];
      for (let i = 0; i < fieldSize; i++) {
         if (dispatch(isEnemy(coordinates, i))) return;
         way.push(`${coordinates}:${i}`);
      }
      dispatch(addWay(way));
   };
}

function getVerticalWay(coordinates) {
   return (dispatch, getState) => {
      const state = getState().settings;
      const fieldSize = state.fieldSize;
      const way = [];
      for (let i = 0; i < fieldSize; i++) {
         if (dispatch(isEnemy(i, coordinates))) return;
         way.push(`${i}:${coordinates}`);
      }
      dispatch(addWay(way));
   };
}

function getFirstDiagonalWay(coordinates) {
   return (dispatch, getState) => {
      const state = getState().settings;
      const fieldSize = state.fieldSize;
      const firstDiagonal = [];
      for (let i = 0; i < fieldSize; i++) {
         if (dispatch(isEnemy(i, i))) return;
         firstDiagonal.push(`${i}:${i}`);
      }
      if (isWayIncludeTheCoordinates(firstDiagonal, coordinates)) {
         dispatch(addWay(firstDiagonal));
      }
   };
}

function getSecondDiagonalWay(coordinates) {
   return (dispatch, getState) => {
      const state = getState().settings;
      const fieldSize = state.fieldSize;
      const lastFieldIndex = fieldSize - 1;
      const secondDiagonal = [];
      for (let i = 0; i < fieldSize; i++) {
         if (dispatch(isEnemy(i, lastFieldIndex - i))) return;
         secondDiagonal.push(`${i}:${lastFieldIndex - i}`);
      }

      if (isWayIncludeTheCoordinates(secondDiagonal, coordinates)) {
         dispatch(addWay(secondDiagonal));
      }
   };

}

function isWayIncludeTheCoordinates(way, coordinates) {
   return way.includes(coordinates);
}

// TODO getField?
function isEnemy(row, cell) {
   return (dispatch, getState) => {
      const state = getState();
      const field = state.game.history[state.game.stepNumber].squares;
      return field[row][cell] === state.AI.enemy;
   };
}

function addWay(way) {
   // TODO: переделать
   return (dispatch, getState) => {
      const state = getState().AI;
      if (state.enemy !== state.AIPlayer) {
         let copyPlayerUnits = state.AIPlayerUnits.concat();
         copyPlayerUnits[state.currentIndex].ways.push({
            points: 0,
            way
         });
         dispatch(setAIPlayerUnits(copyPlayerUnits));
      } else {
         let copyPlayerUnits = state.PlayerUnits.concat();
         copyPlayerUnits[state.currentIndex].ways.push({
            points: 0,
            way
         });
         dispatch(setPlayerUnits(copyPlayerUnits));
      }
   };
}

function calculateWaypoints(player) {
   return (dispatch, getState) => {
      const state = getState().game;
      const field = state.history[state.stepNumber].squares;
      player.forEach(unit => {
         unit.ways.forEach(way => {
            way.way.forEach(coordinates => {
               const splitCoordinates = coordinates.split(':');
               const fieldContent = field[parseInt(splitCoordinates[0])][parseInt(splitCoordinates[1])];
               if (fieldContent === null) {
                  way.points += 1;
               } else {
                  way.points += 2;
               }
            });
            dispatch(addWayToList(way));
         });
      });
   };
}

function getWayWithMaximumPoints() {
   return (dispatch, getState) => {
      const state = getState().AI;
      const bestChoice = {
         points: 0,
         way: []
      };
      state.wayList.forEach(item => {
         if (item.points > bestChoice.points) {
            bestChoice.points = item.points;
            bestChoice.way = item.way;
         }
      });
      return bestChoice.way;
   };
}

function addWayToList(way) {
   return {
      type: AI_ADD_WAY_TO_LIST,
      way
   };
}
