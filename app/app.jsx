import Login from './component/login.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import wxApp from './reducers';

const store = createStore(wxApp);

// `__INITIAL_STATE__` 来自服务器端渲染，下一部分细说
// const initialState = window.__INITIAL_STATE__;

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={Login}/>
    </Router>
  </Provider>
  , document.getElementById('container')
);
