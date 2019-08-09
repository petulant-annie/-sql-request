import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import store from './store';
import Root from './root';

ReactDOM.render(
  <HashRouter><Root store={store} /></HashRouter>,
  document.getElementById('root'));
