import React , { Component, PropTypes } from 'react';
import LoginForm from '../components/LoginForm';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { fetchLogin } from '../actions';
import '../less/login.less'

class Login extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.entities.user !== this.props.entities.user) {
      browserHistory.push(`/weixin/index`);
    }
  }
  render() {
    //state改变会重新渲染这
    const {fetchLogin} = this.props;
    return (
      <LoginForm fetchLogin={fetchLogin}/>
      );
  }
}

Login.propTypes = {
  entities: PropTypes.object.isRequired
};

//此处的state实际上是root的state树
//state.login就是执行了login的redux
function mapStateToProps(state) {
  return {
    entities: state.entities
  }
}
//实际上执行下面一句话就已经执行了上面两个函数
export default connect(mapStateToProps, {
  fetchLogin
})(Login);
