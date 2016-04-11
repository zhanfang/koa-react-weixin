import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
// import 'antd/style/index.less';
class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar history={this.props.history} store={this.props.store}/>
        {this.props.children}
        <Footer></Footer>
      </div>
      );
  }
}

export default App;
