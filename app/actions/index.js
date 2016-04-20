import { CALL_API } from 'redux-api-middleware';
import { REQUEST_LOGIN, SUCCESS_LOGIN, FAILURE_LOGIN, REQUEST_KEY, SUCCESS_KEY, FAILURE_KEY, REQUEST_DELKEY, SUCCESS_DELKEY, FAILURE_DELKEY, REQUEST_ADDKEY, SUCCESS_ADDKEY, FAILURE_ADDKEY, RESET_ERROR_MESSAGE } from '../constants';
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

export function delKey(key, id) {
  const data = JSON.stringify({
    key: key
  });
  return {
    [CALL_API]: {
      endpoint: '/weixin/delkey',
      method: 'POST',
      types: [REQUEST_DELKEY, {
        type: SUCCESS_DELKEY,
        payload: id
      }, FAILURE_DELKEY],
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    }
  }
}

function existErrorMessage() {
  return {
    type: EXIST_ERROR_MESSAGE,
    error: '关键词已存在'
  }
}

export function addKey(data) {
  return {
    [CALL_API]: {
      endpoint: '/weixin/addkey',
      method: 'POST',
      types: [REQUEST_ADDKEY, {
        type: SUCCESS_ADDKEY,
        payload: data
      }, {
        type: FAILURE_ADDKEY,
        meta: (action, state, res) => {
          if (res) {
            if (res.status === 400) {
              return {
                message: '关键词已存在，添加失败！',
              };
            } else {
              return {
                message: res.statusText,
              };
            }
          } else {
            return {
              message: 'Network request failed'
            }
          }
        }
      }],
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  }
}


// Resets the currently visible error message.
export function resetErrorMessage() {
  return {
    type: RESET_ERROR_MESSAGE
  }
}
