import React from 'react';
import { router, Link } from 'react-router';
import CategoriesList from './categories-list';


class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav>
        <ul>
          <CategoriesList />
          <li><Link to={'/account'}>Account Info</Link></li>
        </ul>
      </nav>
    );
  }
}


export default Nav;
