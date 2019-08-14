import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import accountState from './reducers/accountReducers';
import accountMiddleware from './middlewares/accountMiddleware';
// import { checkUser, checkCode, getTokenRefresh } from './requests/request';

// const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({
    accountState,
  }),
  {},
  compose(
    applyMiddleware(
      accountMiddleware,
      logger,
      // sagaMiddleware,
    ),
  ),
);

// sagaMiddleware.run(checkUser, checkCode);

export default store;
