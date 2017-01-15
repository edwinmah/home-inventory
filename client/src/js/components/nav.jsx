import React from 'react';
import { router, Link } from 'react-router';
import CategoriesList from './categories-list';


class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="dtc-l v-mid w-100 w-75-l tc tr-l">
        <ul className="list ph0">
          <CategoriesList />
          <li className="dib v-top pa3"><Link to={'/account'} className="dark-blue hover-navy link">Account Info</Link></li>
        </ul>
      </nav>
    );
  }
}


export default Nav;
