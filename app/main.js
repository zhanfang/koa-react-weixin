import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store/configureStore';
import Root from './containers/Root';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store)
// let history = createBrowserHistory();
// `__INITIAL_STATE__` 来自服务器端渲染，下一部分细说
// const initialState = window.__INITIAL_STATE__;
// history={browserHistory}
ReactDOM.render(
  <Root store={store} history={history} />
  , document.getElementById('container')
);
