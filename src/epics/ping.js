import {PING, PONG} from '../actions/ping';

const pingEpic = action$ => {
  return action$.ofType(PING)
    .delay(1000)
    .mapTo({ type: PONG})
};

export default pingEpic;