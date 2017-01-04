import React from 'react';
import { router, Link } from 'react-router';


class Nav extends React.Component {
  constructor (props) {
    super (props);
  }

  componentDidMount() {
    // dispatch to get categories names
  }

  renderCategoryNames() {

  }


  render() {
    return (
      <nav>
        <ul>
          list of categories
        </ul>
      </nav>
    );
  }
}


export default Nav;
