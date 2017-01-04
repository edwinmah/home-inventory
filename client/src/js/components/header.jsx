import React from 'react';
import { router, Link } from 'react-router';


class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header role="banner" className="site-header">
        <h1 className="site-header__title">
          <Link to={'/'}>Your Home Inventory</Link>
        </h1>
      </header>
    );
  }
}


export default Header;
