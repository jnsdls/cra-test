import {createStore, applyMiddleware} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import rootReducer from '../reducers/rootReducer';
import {composeWithDevTools} from 'redux-devtools-extension';

import pingEpic from '../epics/ping';

const epicMiddleWare = createEpicMiddleware(pingEpic);

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(epicMiddleWare)
  )
);

store.subscribe(() => {
  console.log('store change', store.getState());
});

export default store;