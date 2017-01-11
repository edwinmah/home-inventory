import React from 'react';
import Header from './header';
import Footer from './footer';
import Nav from './nav';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <Nav />
        <main id="content">
          {this.props.children}
        </main>
        <Footer />
      </div>
    );
  }
}


export default App;
