import {SETTING_SET_FIELD_SIZE} from '../store/actions/actionType';
import {createListOfWinningLines} from '../store/actions/victory';
import {gameChangeFieldSize} from '../store/actions/game';

export const settingsMiddleware = store => next => action => {
   const result = next(action);
   if (action.type === SETTING_SET_FIELD_SIZE) {
      store.dispatch(createListOfWinningLines());
      store.dispatch(gameChangeFieldSize());
   }
   return result;
};