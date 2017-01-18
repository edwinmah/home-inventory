import React from 'react';
import { router, Link } from 'react-router';
import CategoriesList from './categories-list';


class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="tc tr-l">
        <ul className="flex list ph0">
          <CategoriesList />
          <li className="pa3"><Link to={'/account'} className="dark-blue hover-navy link">Account Info</Link></li>
        </ul>
      </nav>
    );
  }
}


export default Nav;
