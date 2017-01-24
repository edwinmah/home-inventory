import React from 'react';
import { router, Link } from 'react-router';
import { connect } from 'react-redux';
import actions from '../actions/get-categories';


class CategoriesList extends React.Component {
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

  componentDidMount() {
    // dispatch to get category names
    this.props.dispatch(actions.fetchCategoryNames());
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
    const dropDownDisplay = (this.state.menuIsHidden) ? 'aspect-ratio overflow-hidden o-0' : '';
    const dropDownIcon = (this.state.menuIsHidden) ? {__html: '&plus;'} : {__html: '&minus;'};

    return (
      <li className="relative pa3 nested-list-reset dark-blue hover-navy pointer" onClick={this.handleMenuDisplay}>Categories <span dangerouslySetInnerHTML={dropDownIcon}></span>
        <ul className={`absolute left-0 z-9999 mt3 bt bw1 b--dark-blue br2 shadow-1 ${dropDownDisplay}`}>
          {Object.keys(this.props.categories).map((categoryId) => this.renderCategoryNames(categoryId))}
        </ul>
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
