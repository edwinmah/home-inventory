import React from 'react';
import { hashHistory, Link } from 'react-router';
import cookie from 'react-cookie';
import CategoriesList from './categories-list';


class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuIsHidden: true
    };
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleMenuDisplay = this.handleMenuDisplay.bind(this);
    this.handleCloseMenuDisplay = this.handleCloseMenuDisplay.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleKeyPressEscape = this.handleKeyPressEscape.bind(this);
    this.handleKeyDownEnter = this.handleKeyDownEnter.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPressEscape, false);
  }

  handleSignOut() {
    cookie.remove('accessToken');
    hashHistory.push('/');
  }

  handleKeyPressEscape(event) {
    if (event.keyCode === 27 && !this.state.menuIsHidden) {
      event.preventDefault();
      this.setState({
        menuIsHidden: true
      });
    }
  }

  handleKeyDownEnter(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.setState(
        prevState => ({
          menuIsHidden: !prevState.menuIsHidden
        })
      );
    }
  }

  handleCloseMenuDisplay(event) {
    event.preventDefault();
    this.setState(
      prevState => ({
        menuIsHidden: true
      })
    );
  }

  handleMenuDisplay(event) {
    event.preventDefault();
    this.setState(
      prevState => ({
        menuIsHidden: !prevState.menuIsHidden
      })
    );
    event.stopPropagation();
  }

  handleBlur(event) {
    if (event.relatedTarget && event.relatedTarget.className.indexOf('catLink') !== -1) {
      return;
    }
    this.setState({
      menuIsHidden: true
    });
  }

  renderSignOut() {
    if (cookie.load('accessToken')) {
      return <li className="pa3 dark-blue hover-navy link pointer" tabIndex="0" onClick={this.handleSignOut}>Sign out</li>;
    }
  }

  render() {
    const dropDownDisplay = (this.state.menuIsHidden) ? 'aspect-ratio overflow-hidden o-0' : '';
    const dropDownIcon = (this.state.menuIsHidden) ? {__html: '&plus;'} : {__html: '&minus;'};

    return (
      <nav className="tc tr-l" role="navigation">
        <ul className="flex items-center list ph0">
          <li id="categories"
              className="relative nested-list-reset dark-blue hover-navy pointer"
              aria-haspopup="true"
              aria-owns="category-list"
              aria-controls="category-list"
              onClick={this.handleCloseMenuDisplay}
              onBlur={this.handleBlur}>
            <a href=""
               className="dib pa3 dark-blue hover-navy link"
               onClick={this.handleMenuDisplay}
               onKeyDown={this.handleKeyDownEnter}>
               Categories <span dangerouslySetInnerHTML={dropDownIcon}></span>
            </a>
            <ul id="category-list"
                className={`absolute left-0 z-9999 mt3 bt bw1 b--dark-blue br2 shadow-1 ${dropDownDisplay}`}
                aria-hidden={this.state.menuIsHidden}
                aria-expanded={!this.state.menuIsHidden}
                aria-labelledby="categories"
                aria-label="submenu">
              <CategoriesList menuIsHidden={this.state.menuIsHidden} />
              <li><Link to={'/categories/edit'} className="catLink db pa3 bt b--black-20 dark-blue hover-navy link bg-light-gray hover-bg-light-silver" tabIndex={this.state.menuIsHidden ? '-1' : '0'}>Add/Edit</Link></li>
            </ul>
          </li>
          <li><Link to={'/account'} className="pa3 dark-blue hover-navy link">Account Info</Link></li>
          {this.renderSignOut()}
        </ul>
      </nav>
    );
  }
}


export default Nav;
