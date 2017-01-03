import React from 'react';
import Header from './header';
import Nav from './nav';
import Main from './main';
import Footer from './footer';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        <Header />
        <Nav />
        <Main />
        <Footer />
      </div>
    );
  }
}


export default App;
