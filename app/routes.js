import React from 'react';
import { Route } from 'react-router';
import App from './component/app';
import Login from './component/login';
import Index from './component/index';
import Page from './component/page';

export default (
<Route component={App}>
    <Route path='/' component={Login} />
    <Route path='/login' component={Login} />
    <Route path='/index' component={Index} />
    <Route path='/page' component={Page} />
  </Route>
);
