import {GAME_SET_STATE} from '../store/actions/actionType';
import {AITurn} from '../store/actions/game';
import AI from '../AI/AI.js';

export const AITurnMiddleware = store => next => action => {


   const result = next(action);
   if (action.type === GAME_SET_STATE) {

      const state = store.getState();
      // if (!state.game.xIsNext && state.settings.gameMode === 2) {
      if (!state.game.xIsNext) {
         const robot = new AI(store);
         robot.makeMove()
      }
   }
   return result;
};
