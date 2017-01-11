import React from 'react';
import { router, Link } from 'react-router';
import CategoriesList from './categories-list';


class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickForItems = this.handleClickForItems.bind(this);
    this.handleClickForAcctInfo = this.handleClickForAcctInfo.bind(this);
  }

  handleClickForItems() {
    console.log('change current view to all items');
    // dispatch action to change current view to all items
  }

  handleClickForAcctInfo() {
    console.log('change current view to account info');
    // dispatch action to change current view to account info (owner and policy details)
  }

  render() {
    return (
      <nav>
        <ul>
          <li><Link to={'/items'} onClick={this.handleClickForItems}>All Items</Link></li>
          <CategoriesList />
          <li onClick={this.handleClickForAcctInfo}>Account Info</li>
        </ul>
      </nav>
    );
  }
}


export default Nav;
