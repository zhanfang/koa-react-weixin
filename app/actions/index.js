import fetch from 'isomorphic-fetch';
import { REQUEST_LOGIN, SUCCESS_LOGIN, FAILURE_LOGIN } from '../constants';

function requestLogin() {
  return {
    type: REQUEST_LOGIN
  }
}

function successLogin(user) {
  console.log(user);
  return {
    type: SUCCESS_LOGIN,
    user
  }
}

function failureLogin() {
  return {
    type: FAILURE_LOGIN
  }
}

export function fetchLogin(user) {
  const data = JSON.stringify(user);
  return dispatch => {
    dispatch(requestLogin());
    return fetch('/weixin/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    }).then(response => {
      if (!response.ok) {
        return dispatch(failureLogin());
      } else {
        return dispatch(successLogin(user));
      }
    });
  }
}
