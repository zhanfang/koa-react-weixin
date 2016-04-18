import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import merge from 'lodash/merge';
import * as ActionTypes from '../constants';
import login from './login';
import keys from './key';
import { SUCCESS_LOGIN, SUCCESS_KEY } from '../constants';

function entities(state = {
    user: {},
    keys: []
  } , action) {
  switch (action.type) {
    case SUCCESS_LOGIN:
      return Object.assign({}, state, {
        user: action.payload,
      });
      break;
    case SUCCESS_KEY:
      return Object.assign({}, state, {
        keys: action.payload,
      });
      break;
    default:

  }
  // if (action.response && action.response.entities) {
  //   return merge({}, state, action.response.entities)
  // }

  return state
}

// Updates error message to notify about the failed fetches.
function errorMessage(state = null, action) {
  const {type, error} = action

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return action.error
  }

  return state
}

const rootReducer = combineReducers({
  entities,
  errorMessage,
  routing
});

export default rootReducer;
