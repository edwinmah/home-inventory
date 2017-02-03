import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { deleteCategory } from '../actions/delete-category';
import { formatAsCurrency, calcTotalValue } from '../utils';


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

  renderItemMsg(itemCount, totalValue) {
    return (
      <span>This category contains {`${itemCount} ${(itemCount > 1) ? 'items' : 'item'}`} worth {`${formatAsCurrency(totalValue)}.`} <Link to={`/category/${this.props.params.id}/items`} className="dark-blue hover-navy link">Please reclassify these {`${(itemCount > 1) ? 'items' : 'item'}`}</Link> before deleting this category.</span>
    )
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

    const keys = Object.keys(this.props.items);
    const categoryFilter = keys.filter((itemId) => {
      return this.props.params.id === this.props.items[itemId].categoryId;
    });

    const itemCount  = categoryFilter.length;
    const totalValue = calcTotalValue(categoryFilter, this.props.items, 'replaceValue');
    const isDisabled = (itemCount > 0) ? 'disabled' : '';

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
            <p className="lh-title b">{(itemCount > 0) ? this.renderItemMsg(itemCount, totalValue) : 'Are you sure you want to delete this category?'}</p>
            <div className="flex">
              <Link to={'/categories'} className={`${sharedStyle} bg-mid-gray hover-bg-dark-gray tc`}>{(isDisabled) ? 'Go back' : 'No, go back.'}</Link>
              <button type="submit" disabled={isDisabled} className={`${sharedStyle} bg-red ${(!isDisabled) ? 'hover-bg-dark-red' : ''}`}>{(isDisabled) ? 'Disabled' : 'Yes, delete'}</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state, props) => {
  return {
    items: state.items,
    categories: state.categories,
    currentCategory: state.categories[props.params.id]
  }
};


export default connect(mapStateToProps)(DeleteCategory);
