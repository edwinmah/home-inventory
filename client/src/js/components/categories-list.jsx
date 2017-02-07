import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';


class CategoriesList extends React.Component {
  constructor(props) {
    super(props);
  }

  renderCategoryNames(categoryId) {
    return (
      <li role="menuitem">
        <Link to={`/category/${categoryId}/items`} key={categoryId} id={`category-${categoryId}`} className="db pa3 bt b--black-20 dark-blue hover-navy link bg-light-gray hover-bg-light-silver" tabIndex={this.props.menuIsHidden ? '-1' : '0'}>
          {this.props.categories[categoryId].name}
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
