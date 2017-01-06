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
    // this.props.categories is empty which is affecting the action
    // is this why the category names won't render
    console.log(this.props.categories);
    this.props.dispatch(actions.fetchCategoryNames(this.props.categories));
  }

  renderCategoryNames(categoryId) {
    //const { name } = this.props.categories[categoryId].name; // this prevents rendering
    //console.log(this.props.categories);
    return (
      <li key={categoryId} id={"category-" + categoryId}>
        <Link to={'/category/' + categoryId + '/items'}>
          {categoryId}
        </Link>
      </li>
    );
  }

  render() {
    console.log(this.props.categories);
    console.log(Object.keys(this.props.categories).map(this.renderCategoryNames));

    return (
      <nav>
        <ul>
          {Object.keys(this.props.categories).map(this.renderCategoryNames)}
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


const Container = connect(mapStateToProps)(Nav);


export default Container;
