// 定义初始化状态，初始化状态是常量
const initState = {
  user: {
    username: 'zhanfang',
    password: 'zhanfang123'
  }
};

export default function login(state = initState, action) {
  switch (action.type) {
    case 'LOGIN':
      return [
        ...state, action.text,
      ]
    default:
      return state
  }
}
