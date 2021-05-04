import {GAME_SET_PLAYER_SIDE, GAME_SET_STATE} from '../store/actions/actionType';
import AI from '../AI/AI.js';
import {FIRST_PLAYER, PLAYER_VS_AI_MODE} from '../constants';

export const AITurnMiddleware = store => next => action => {

   const result = next(action);
   if (action.type === GAME_SET_STATE || action.type === GAME_SET_PLAYER_SIDE) {
      const state = store.getState();

      if (state.settings.gameMode === PLAYER_VS_AI_MODE) {
         let AIPlayer = new AI(store);
         if (state.game.playerSide === FIRST_PLAYER) {
            if (!state.game.xIsNext) AIPlayer.makeMove();
         } else {
            if (state.game.xIsNext) AIPlayer.makeMove();
         }
         AIPlayer = null;
      }
   }
   return result;
};

