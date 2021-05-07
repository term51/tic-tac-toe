import {combineReducers} from 'redux';
import gameReducer from './reducers/game';
import settingsReducer from './reducers/settings';
import AIReducer from './reducers/AI';
import victoryReducer from './reducers/victory';

export default combineReducers({
   game: gameReducer,
   settings: settingsReducer,
   AI: AIReducer,
   victory: victoryReducer
});