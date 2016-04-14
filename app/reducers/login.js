// 定义初始化状态，初始化状态是常量
const initState = {};

export default function login(state = initState, action) {
  switch (action.type) {
    case 'SUCCESS':
      return [
        ...state, action.text,
      ];
    case 'FAILED':
      return [...state, action.text];
    default:
      return state
  }
}
