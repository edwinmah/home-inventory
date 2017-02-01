import React from 'react';
import Header from './header';
import Footer from './footer';
import { connect } from 'react-redux';
import { fetchItems } from '../actions/get-items';
import { fetchCategoryNames } from '../actions/get-categories';
import { fetchPolicies } from '../actions/get-policies';
import { fetchOwners } from '../actions/get-owners';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(fetchItems());
    this.props.dispatch(fetchCategoryNames());
    this.props.dispatch(fetchPolicies());
    this.props.dispatch(fetchOwners());
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
