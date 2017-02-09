import React from 'react';
import { Link } from 'react-router';
import Nav from './nav';


class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header role="banner" className="site-header">
        <div className="site-header__container flex flex-column flex-row-l flex-wrap justify-center justify-between-ns items-center mw6 mw8-ns center ph3 pv4 pv5-l">
          <h1 className="tc">
            <Link to={'/'} className="dark-blue hover-navy link garamond fw2 f3 tracked-mega ttu">Your Home Inventory</Link>
          </h1>
          <Nav />
        </div>
      </header>
    );
  }
}


export default Header;
