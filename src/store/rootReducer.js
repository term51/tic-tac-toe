import {combineReducers} from 'redux';
import gameReducer from './reducers/game';
import settingsReducer from './reducers/settings';

export default combineReducers({
   game: gameReducer,
   settings: settingsReducer
});