import {GAME_SET_STATE} from '../store/actions/actionType';
import AI from '../AI/AI.js';

export const AITurnMiddleware = store => next => action => {


   const result = next(action);
   if (action.type === GAME_SET_STATE) {

      const state = store.getState();
      // if (!state.game.xIsNext && state.settings.gameMode === 2) {
      if (!state.game.xIsNext) {
         let AIPlayer = new AI(store);
         AIPlayer.makeMove();
         AIPlayer = null;
         // Класс должен быть создан 1 раз
      }
   }
   return result;
};

