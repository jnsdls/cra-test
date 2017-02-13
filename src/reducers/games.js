import {ADD_GAME} from '../actions/games';

export default function games(state = [], action = {}) {
  switch(action.type){
    case ADD_GAME: return state.concat(action.payload);
    default: return state;
  }
}