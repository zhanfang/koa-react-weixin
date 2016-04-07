import { combineReducers } from 'redux';

// 定义初始化状态，初始化状态是常量
const initState = {};

function loginReducer(state = initState, action) {
  switch (action.type) {
    case 'LOGIN':
      return [
        ...state,
        {
          text: action.text
        }
      ]
    default:
      return state
  }
}

const wxApp = combineReducers({
  loginReducer
})

export default wxApp;
