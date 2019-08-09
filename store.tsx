import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import accountState from './reducers/accountReducers';
import accountMiddleware from './middlewares/accountMiddleware';

const store = createStore(
  combineReducers({
    accountState,
  }),
  {},
  compose(
    applyMiddleware(accountMiddleware, logger),
    ),
);

export default store;
