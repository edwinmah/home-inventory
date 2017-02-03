import React from 'react';
import Header from './header';
import Footer from './footer';
import { connect } from 'react-redux';
import { fetchItems } from '../actions/get-items';
import { fetchCategoryNames } from '../actions/get-categories';
import { fetchPolicies } from '../actions/get-policies';
import { fetchOwners } from '../actions/get-owners';
import GoogleAuthorization from './auth';
import cookie from 'react-cookie';


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

  renderMainContent() {
    if (!cookie.load('accessToken')) {
      return <GoogleAuthorization />;
    }
    return this.props.children;
  }

  render() {
    return (
      <div className="bt bw2 b--dark-blue sans-serif">
        <Header />
        <main id="content">
          {this.renderMainContent()}
        </main>
        <Footer />
      </div>
    );
  }
}


const mapStateToProps = (state, props) => {
  return {}
};


export default connect(mapStateToProps)(App);
