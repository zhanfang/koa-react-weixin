import React , { Component, PropTypes } from 'react';
import LoginForm from './LoginForm';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as LoginActions from '../actions/login';
import 'antd/style/index.less';
import '../less/login.less'

class Login extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    //state改变会重新渲染这
    const {login, actions} = this.props;
    return (
      <LoginForm login={actions.login}/>
      );
  }
}

Login.propTypes = {
  // login: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

//此处的state实际上是root的state树
//state.login就是执行了login的redux
function mapStateToProps(state) {
  return {
    login: state.login
  }
}
//将 Store 中的 dispatch方法 直接封装成对象的一个属性
//一般会用到 Redux 的辅助函数 bindActionCreators()
//这里将 dispatch 绑定到 action属性
//这样不需要 dispatch(changeRed())，直接使用 actions.login()
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(LoginActions, dispatch)
  }
}
//实际上执行下面一句话就已经执行了上面两个函数
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
