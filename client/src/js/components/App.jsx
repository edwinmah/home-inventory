import React from 'react';
import Header from './header';
import Footer from './footer';
import { connect } from 'react-redux';
import actions from '../actions/get-items';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // dispatch to get all items
    this.props.dispatch(actions.fetchItems());
    document.body.scrollTop = 0;
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


const mapStateToProps = (state, props) => {
  return {
    items: state.items
  }
};


export default connect(mapStateToProps)(App);


//export default App;
