import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './component/app';
import Login from './component/login';
import Index from './component/index';
import Page from './component/page';
// import createBrowserHistory from 'history/lib/createBrowserHistory';

const store = configureStore();
// let history = createBrowserHistory();
// `__INITIAL_STATE__` 来自服务器端渲染，下一部分细说
// const initialState = window.__INITIAL_STATE__;
// history={browserHistory}
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={App}>
        <Route path='/' component={Login} />
        <Route path='/login' component={Login} />
        <Route path='/index' component={Index} />
        <Route path='/page' component={Page} />
      </Route>
    </Router>
  </Provider>
  , document.getElementById('container')
);
