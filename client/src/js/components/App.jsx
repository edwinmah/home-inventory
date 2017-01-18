import React from 'react';
import Header from './header';
import Footer from './footer';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="bt bw2 b--dark-blue sans-serif">
        <Header />
        <main id="content">
          {this.props.children}
        </main>
        <Footer />
      </div>
    );
  }
}


export default App;
