import React from 'react';
import { Route } from 'react-router';
import App from './containers/App';
import Login from './containers/Login';
import Index from './containers/Index';

export default (
<Route path="/weixin" component={App}>
    <Route path='login' component={Login} />
    <Route path='index' component={Index} />
  </Route>
);
