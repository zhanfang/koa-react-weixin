import { REQUEST_KEY, SUCCESS_KEY, FAILURE_KEY } from '../constants';
// 定义初始化状态，初始化状态是常量
const initState = {
  isFetching: false,
  items: []
};

export default function keys(state = initState, action) {
  switch (action.type) {
    case REQUEST_KEY:
      return Object.assign({}, state, {
        isFetching: true
      });
    case SUCCESS_KEY:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.keys,
      });
    case FAILURE_KEY:
      return Object.assign({}, state, {
        isFetching: false,
        err: true
      });
    default:
      return state
  }
}
