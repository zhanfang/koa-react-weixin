import React from 'react';
import { Route, RouterContext } from 'react-router';
import App from './component/App';
import Login from './component/Login';
import Index from './component/Index';
import Page from './component/Page';

export default (
<Route path="/weixin" component={App}>
    <Route path='login' component={Login} />
    <Route path='index' component={Index} />
    <Route path='page' component={Page} />
  </Route>
);
