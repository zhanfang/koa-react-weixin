import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import merge from 'lodash/merge';
import * as ActionTypes from '../constants';
import { SUCCESS_LOGIN, SUCCESS_KEY, SUCCESS_DELKEY, SUCCESS_ADDKEY } from '../constants';

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
    case SUCCESS_DELKEY:
      let keys = state.keys;
      // keys.splice(action.payload, 1);
      // return Object.assign({}, state, {
      //   keys: keys,
      // });
      keys = keys.filter((key, index) => index !== action.payload);
      return Object.assign({}, state, {
        keys: keys,
      });
      break;
    case SUCCESS_ADDKEY:
      let data = [action.payload, ...state.keys];
      return Object.assign({}, state, {
        keys: data,
      });
      break;
    default:
      return state;
  }
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
