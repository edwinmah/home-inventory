import React from 'react';
import { router, Link } from 'react-router';
import { connect } from 'react-redux';
import actions from '../actions/get-categories';


class CategoriesList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // dispatch to get category names
    this.props.dispatch(actions.fetchCategoryNames());
  }

  renderCategoryNames(categoryId) {
    const { name } = this.props.categories[categoryId];
    return (
      <Link key={categoryId} to={`/category/${categoryId}/items`}  id={`category-${categoryId}`} className="db pa3 bt b--black-20 dark-blue hover-navy link bg-light-gray hover-bg-light-silver">
        {name}
      </Link>
    );
  }

  render() {
    return (
      <li>
        {Object.keys(this.props.categories).map((categoryId) => this.renderCategoryNames(categoryId))}
      </li>
    );
  }
}


const mapStateToProps = (state, props) => {
  return {
    categories: state.categories
  };
};


export default connect(mapStateToProps)(CategoriesList);
