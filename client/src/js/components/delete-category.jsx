import React from 'react';
import { router, Link } from 'react-router';
import { connect } from 'react-redux';
import { deleteCategory } from '../actions/delete-category';


class DeleteCategory extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    document.body.scrollTop = 0;
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(deleteCategory(this.props.params.id));
  }

  render() {
    if (!this.props.currentCategory) {
      return (
        <div className="mw6 mw8-ns center">
          <p className="pa3">Loading category...</p>
        </div>
      );
    }

    const { name, description } = this.props.currentCategory;
    const sharedStyle = 'w-50 link bn br2 ph3 pv2 mr2 mv3 white';

    return (
      <div className="mw6 mw8-ns center ph3">
        <div className="flex flex-column items-center">
          <div className="w-100 w-50-ns mb4">
            <h2 className="mb0 pv3">{name}</h2>
            <dl className="flex lh-title mv2">
              <dt className="mr2 b">Description:</dt>
              <dd className="ml0 dark-gray">{(description) ? description : 'No description for this category'}</dd>
            </dl>
          </div>

          <form onSubmit={this.handleSubmit} className="w-100 w-50-ns">
            <p className="f5 f4-l b">Are you sure you want to delete this category?</p>
            <div className="flex">
              <Link to={'/categories'} className={`${sharedStyle} bg-mid-gray hover-bg-dark-gray tc`}>No, go back.</Link>
              <button type="submit" className={`${sharedStyle} bg-red hover-bg-dark-red`}>Yes, delete.</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state, props) => {
  return {
    categories: state.categories,
    currentCategory: state.categories[props.params.id]
  }
};


export default connect(mapStateToProps)(DeleteCategory);
