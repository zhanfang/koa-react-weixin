import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, applyMiddleware(thunk, apiMiddleware));
}
