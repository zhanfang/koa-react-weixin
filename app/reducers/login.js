import { REQUEST_LOGIN, SUCCESS_LOGIN, FAILURE_LOGIN } from '../constants';
// 定义初始化状态，初始化状态是常量
const initState = {
  isFetching: false,
  user: {}
};

export default function login(state = initState, action) {
  switch (action.type) {
    case REQUEST_LOGIN:
      return Object.assign({}, state, {
        isFetching: true
      });
    case SUCCESS_LOGIN:
      return Object.assign({}, state, {
        isFetching: false,
        user: action.user,
      });
    case FAILURE_LOGIN:
      return Object.assign({}, state, {
        isFetching: false,
        err: true
      });
    default:
      return state
  }
}
