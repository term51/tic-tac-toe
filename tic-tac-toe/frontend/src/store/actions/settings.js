import {SETTING_SET_AI_DIFFICULTY, SETTING_SET_FIELD_SIZE, SETTING_SET_GAME_MODE} from './actionType';

export function setFieldSize(fieldSize) {
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

