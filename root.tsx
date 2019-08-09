import * as React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import history from './history';

import Main from './containers/main/main';

const Root = ({ store }: any) => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/:filter?" component={Main} />
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
