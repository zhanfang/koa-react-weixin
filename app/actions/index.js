import { CALL_API } from 'redux-api-middleware';
import { REQUEST_LOGIN, SUCCESS_LOGIN, FAILURE_LOGIN, REQUEST_KEY, SUCCESS_KEY, FAILURE_KEY } from '../constants';
import { Schema, arrayOf, normalize } from 'normalizr';

const userSchema = new Schema('users');
export function fetchLogin(user) {
  const data = JSON.stringify(user);
  return {
    [CALL_API]: {
      endpoint: '/weixin/login',
      method: 'POST',
      types: [REQUEST_LOGIN, {
        type: SUCCESS_LOGIN,
        payload: user
      }, FAILURE_LOGIN],
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: data
    }
  }
}


export function fetchKey() {
  return {
    [CALL_API]: {
      endpoint: '/weixin/keywords',
      method: 'GET',
      types: [REQUEST_KEY, SUCCESS_KEY, FAILURE_KEY],
      credentials: 'include'
    }
  }
}

// Resets the currently visible error message.
export function resetErrorMessage() {
  return {
    type: RESET_ERROR_MESSAGE
  }
}
