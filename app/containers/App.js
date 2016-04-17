import React , { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions';
import NavBar from './NavBar';
import Footer from './Footer';
import 'antd/style/index.less';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        {this.props.children}
        <Footer></Footer>
        <p>
          Move the DevTools with Ctrl+W or hide them with Ctrl+H.
        </p>
      </div>
      );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    errorMessage: state.errorMessage,
    inputValue: ownProps.location.pathname.substring(1)
  }
}

export default connect(mapStateToProps, {
  login
})(App);
