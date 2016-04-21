import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import merge from 'lodash/merge';
import { SUCCESS_LOGIN, SUCCESS_KEY, SUCCESS_DELKEY, SUCCESS_ADDKEY, RESET_ERROR_MESSAGE } from '../constants';

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
      keys = keys.filter((key, index) => index !== action.payload);
      return Object.assign({}, state, {
        keys: keys,
      });
      break;
    case SUCCESS_ADDKEY:
      if (action.payload) {
        let data = [action.payload, ...state.keys];
        return Object.assign({}, state, {
          keys: data,
        });
      } else {
        return state;
      }
      break;
    default:
      return state;
  }
}

// Updates error message to notify about the failed fetches.
function errorMessage(state = null, action) {
  const {type, meta} = action
  if (type === RESET_ERROR_MESSAGE) {
    return null
  } else if (meta) {
    return meta.message
  }

  return state
}

const rootReducer = combineReducers({
  entities,
  errorMessage,
  routing
});

export default rootReducer;
