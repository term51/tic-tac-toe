import {GAME_SET_PLAYER_SIDE, GAME_MAKE_MOVE} from '../store/actions/actionType';
import {FIRST_PLAYER, PLAYER_VS_AI_MODE} from '../constants';
import {AIMakeMove} from '../store/actions/AI';

export const AIMiddleware = store => next => action => {

   const result = next(action);
   if (action.type === GAME_MAKE_MOVE) {
      makeAIMove();
   }

   if (action.type === GAME_SET_PLAYER_SIDE) {
      makeAIMove();
   }

   function makeAIMove() {
      const state = store.getState();
      if (state.settings.gameMode === PLAYER_VS_AI_MODE) {
         if (state.game.playerSide === FIRST_PLAYER) {
            if (!state.game.xIsNext) store.dispatch(AIMakeMove());
         } else {
            if (state.game.xIsNext) store.dispatch(AIMakeMove());
         }
      }

      console.log(state);
   }


   return result;
};

