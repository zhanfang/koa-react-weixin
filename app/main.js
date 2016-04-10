import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Router from 'react-router';
import routes from './routes';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import configureStore from './store/configureStore';

const store = configureStore();
let history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>{routes}</Router>
  </Provider>
  , document.getElementById('container')
);
