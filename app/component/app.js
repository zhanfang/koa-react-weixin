import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar history={this.props.history}/>
        {this.props.children}
        <Footer></Footer>
      </div>
      );
  }
}

export default App;
