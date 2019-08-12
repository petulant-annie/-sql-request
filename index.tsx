import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import store from './store';
import Root from './root';

ReactDOM.render(
  <BrowserRouter basename="/"><Root store={store} /></BrowserRouter>,
  document.getElementById('root'));
