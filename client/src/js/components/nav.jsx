import React from 'react';
import { router, Link } from 'react-router';
import { connect } from 'react-redux';
import actions from '../actions/get-category-names';


class Nav extends React.Component {
  constructor(props) {
    super(props);
    //this.renderCategoryNames = this.renderCategoryNames.bind(this);
  }

  componentDidMount() {
    // dispatch to get category names
    // this.props.categories is empty which is affecting the action
    // is this why the category names won't render
    console.log(this.props.categories);
    this.props.dispatch(actions.fetchCategoryNames(this.props.categories));
  }

  renderCategoryNames(category, i) {
    const { _id, name } = this.props.categories;
    return (
      <li key={_id} id={"category-" + _id}>
        <Link to={'/category/' + _id + '/items'}>
          {name}
        </Link>
      </li>
    );
  }

  render() {
    console.log(this.props.categories);
    console.log(this.props.categories.map((category) => this.renderCategoryNames(category)));
    return (
      <nav>
        <ul>
          {this.props.categories.map((category) => this.renderCategoryNames(category))}
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
