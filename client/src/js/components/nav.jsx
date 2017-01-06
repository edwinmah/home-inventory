import React from 'react';
import { router, Link } from 'react-router';
import { connect } from 'react-redux';
import actions from '../actions/get-category-names';


class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // dispatch to get category names
    this.props.dispatch(actions.fetchCategoryNames(this.props.categories));
  }

  renderCategoryNames(categoryId) {
    const { name } = this.props.categories[categoryId];
    return (
      <li key={categoryId} id={"category-" + categoryId}>
        <Link to={'/category/' + categoryId + '/items'}>
          {name}
        </Link>
      </li>
    );
  }

  render() {
    return (
      <nav>
        <ul>
          {Object.keys(this.props.categories).map((categoryId) => this.renderCategoryNames(categoryId))}
        </ul>
      </nav>
    );
  }
}


const mapStateToProps = (state, props) => {
  return {
    categories: state.categories
  };
};


export default connect(mapStateToProps)(Nav);
