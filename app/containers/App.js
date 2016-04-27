import React , { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions';
import NavBar from './NavBar';
// import Footer from './Footer';
import 'antd/style/index.less';

class App extends Component {
  render() {
    const {user, history} = this.props;
    return (
      <div>
        <NavBar history={history} />
        {this.props.children}
      </div>
      );
  }
}
function mapStateToProps(state, ownProps) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, {
  login
})(App);
