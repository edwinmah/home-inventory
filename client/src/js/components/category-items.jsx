import React from 'react';
import { router, Link } from 'react-router';


class CategoryItems extends React.Component {
  constructor (props) {
    super (props);
  }

  componentDidMount() {
    // dispatch to get items for this category
  }

  renderCategoryItems() {

  }

  render () {
    return (
      <ul>
        category items go here
      </ul>
    );
  }
}


export default CategoryItems;
