import React from 'react';
import { router, Link } from 'react-router';
import CategoriesList from './categories-list';


class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuIsHidden: true
    };
    this.handleMenuDisplay = this.handleMenuDisplay.bind(this);
  }

  handleMenuDisplay() {
    this.setState(
      prevState => ({
        menuIsHidden: !prevState.menuIsHidden
      })
    );
  }

  render() {
    const dropDownDisplay = (this.state.menuIsHidden) ? 'aspect-ratio overflow-hidden o-0' : '';
    const dropDownIcon = (this.state.menuIsHidden) ? {__html: '&plus;'} : {__html: '&minus;'};

    return (
      <nav className="tc tr-l">
        <ul className="flex list ph0">
          <li className="relative pa3 nested-list-reset dark-blue hover-navy pointer" onClick={this.handleMenuDisplay}>Categories <span dangerouslySetInnerHTML={dropDownIcon}></span>
            <ul className={`absolute left-0 z-9999 mt3 bt bw1 b--dark-blue br2 shadow-1 ${dropDownDisplay}`}>
              <CategoriesList />
              <li className="db pa3 bt b--black-20 dark-blue hover-navy link bg-light-gray hover-bg-light-silver">Add/Edit</li>
            </ul>
          </li>
          <li className="pa3"><Link to={'/account'} className="dark-blue hover-navy link">Account Info</Link></li>
        </ul>
      </nav>
    );
  }
}


export default Nav;
