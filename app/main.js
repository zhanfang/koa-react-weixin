import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import routes from './routes';
import configureStore from './store/configureStore';
// import createBrowserHistory from 'history/lib/createBrowserHistory';

const store = configureStore();
// let history = createBrowserHistory();
// `__INITIAL_STATE__` 来自服务器端渲染，下一部分细说
// const initialState = window.__INITIAL_STATE__;
// history={browserHistory}
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>
  , document.getElementById('container')
);
