import React from 'react';
import { router, Link } from 'react-router';
import Nav from './nav';


class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header role="banner" className="site-header">
        <div className="mw5 mw8-ns center pa4 ph3-ns">
          <h1 className="dtc-l v-mid w-100 w-25-l tc tl-l mb2 mb0-l">
            <Link to={'/'} className="dark-blue hover-navy link">Your Home Inventory</Link>
          </h1>
          <Nav />
        </div>
      </header>
    );
  }
}


export default Header;
