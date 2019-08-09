import { Dispatch, Action } from 'redux';

const accountMiddleware = () => (next: Dispatch) => (action: Action) => {
  console.log('Logged action', action);
  next(action);
};

export default accountMiddleware;
