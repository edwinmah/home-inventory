import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchCategoryNames } from '../actions/get-categories';
import EditCategory from './edit-category';


class CategoriesPanel extends React.Component {
  constructor(props) {
    super(props);
  }

//  componentDidMount() {
//    this.props.dispatch(fetchCategoryNames());
//  }

//  renderBtn() {
//    return (
//      <span className="flex mt2 mb3">
//        <Link to={`/category/delete/${categoryId}`} className={`w-20 link ${deleteBtnStyle}`}>Delete</Link>
//        <Link to={`/category/edit/${categoryId}`} className={`w-20 link ${editBtnStyle}`}>Edit</Link>
//      </span>
//    );
//  }

  renderCategoryNames(categoryId) {
    const { _id, name, description } = this.props.categories[categoryId];
    const editBtnStyle   = 'dark-blue hover-navy';
    const deleteBtnStyle = 'red hover-dark-red';

    return (
      <li key={categoryId} id={`category-${categoryId}`} className="pv2">
        <Link to={`/category/edit/${categoryId}`} className={`link ${editBtnStyle}`}>{name}</Link>
      </li>
    );
  }

  renderCategoryForm() {
    if (this.props.children) {
      return (
        <EditCategory params={this.props.params} />
      );
    }
  }

  render() {
    if (!this.props.categories) {
      this.props.dispatch(fetchCategoryNames());
      return (
        <div className="mw6 mw8-ns center">
          <p className="pa3">Loading...</p>
        </div>
      );
    }

    console.log(this.props);

    return (
      <div className="flex mw6 mw8-ns center ph3">
        <section className="w-100 w-50-ns">
          <h2>Edit Categories</h2>
          <ul className="flex flex-column flex-wrap vh-25 pl0 list">
            {Object.keys(this.props.categories).map((categoryId) => this.renderCategoryNames(categoryId))}
          </ul>
          <Link to={'/category/add'} className="w-20 link bn br2 ph3 pv2 mv3 white bg-dark-blue hover-bg-navy sans-serif">Add Category</Link>
        </section>
        {this.renderCategoryForm()}
      </div>
    );
  }
}


const mapStateToProps = (state, props) => {
  return {
    categories: state.categories
  }
};


export default connect(mapStateToProps)(CategoriesPanel);
