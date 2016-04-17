import React , { Component, PropTypes } from 'react';
import LoginForm from './LoginForm';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { fetchLogin } from '../actions';
import '../less/login.less'

class Login extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.login !== this.props.login) {
      browserHistory.push(`/weixin/index`);
    }
  }
  render() {
    //state改变会重新渲染这
    const {login, fetchLogin} = this.props;
    return (
      <LoginForm fetchLogin={fetchLogin}/>
      );
  }
}

Login.propTypes = {
  login: PropTypes.object.isRequired
};

//此处的state实际上是root的state树
//state.login就是执行了login的redux
function mapStateToProps(state) {
  return {
    login: state.login
  }
}
//实际上执行下面一句话就已经执行了上面两个函数
export default connect(mapStateToProps, {
  fetchLogin
})(Login);
