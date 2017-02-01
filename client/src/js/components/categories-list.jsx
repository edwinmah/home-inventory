import React from 'react';
import { router, Link } from 'react-router';
import { connect } from 'react-redux';


class CategoriesList extends React.Component {
  constructor(props) {
    super(props);
  }

  renderCategoryNames(categoryId) {
    const { name } = this.props.categories[categoryId];
    return (
      <li key={categoryId} id={`category-${categoryId}`}>
        <Link to={`/category/${categoryId}/items`} className="db pa3 bt b--black-20 dark-blue hover-navy link bg-light-gray hover-bg-light-silver">
          {name}
        </Link>
      </li>
    );
  }

  render() {
    return (
      <span>
        {Object.keys(this.props.categories).map((categoryId) => this.renderCategoryNames(categoryId))}
      </span>
    );
  }
}


const mapStateToProps = (state, props) => {
  return {
    categories: state.categories
  };
};


export default connect(mapStateToProps)(CategoriesList);
