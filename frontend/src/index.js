import React from 'react';
import ReactDOM from 'react-dom';

import { Router } from 'react-router-dom';

import { Provider } from 'react-redux';

import './index.css';

import history from './history';
import store from './store';

import App from './App';

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
  , document.getElementById('root'),
);
