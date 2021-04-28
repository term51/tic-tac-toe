import {SETTING_SET_AI_DIFFICULTY, SETTING_SET_FIELD_SIZE, SETTING_SET_GAME_MODE} from './actionType';

export function setFieldSize(payload) {
   const rowsAndCells = payload.split('x');
   const fieldSize = {
      rows: parseInt(rowsAndCells[0]),
      cells: parseInt(rowsAndCells[1])
   };
   return {
      type: SETTING_SET_FIELD_SIZE,
      fieldSize
   };
}

export function setGameMode(gameMode) {
   return {
      type: SETTING_SET_GAME_MODE,
      gameMode
   };
}

export function setAIDifficulty(AIDifficulty) {
   return {
      type: SETTING_SET_AI_DIFFICULTY,
      AIDifficulty
   };
}

