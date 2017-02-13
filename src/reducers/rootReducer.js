import {combineReducers} from 'redux';

import games from './games';
import ping from './ping';

export default combineReducers({
  games,
  ping
})