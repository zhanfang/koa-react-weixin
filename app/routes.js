import React from 'react';
import { Route } from 'react-router';
import App from './component/App';
import Login from './component/Login';
import Index from './component/Index';
import Page from './component/Page';

export default (
<Route component={App}>
    <Route path='/' component={Index} />
    <Route path='/login' component={Login} />
    <Route path='/index' component={Index} />
    <Route path='/page' component={Page} />
  </Route>
);
