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
    let totalValue = 0;
    let statusMsg  = 'Are you sure you want to delete this category?';
    if (itemCount > 0) {
      totalValue = calcTotalValue(categoryFilter, this.props.items, 'replaceValue');
      statusMsg  = this.renderItemMsg(itemCount, totalValue);
    }

    return (
      <section className="mw6 mw8-ns center ph3 ph0-l">
        <header className="mb4 bt bb b--black-20">
          <h2 className="mw6 center ph3">{name}</h2>
        </header>
        <div className="flex flex-column items-center">
          <div className="w-100 w-50-ns mb4">
            <dl className="flex lh-title mv2">
              <dt className="mr2 b">Description:</dt>
              <dd className="ml0 dark-gray">{(description) ? description : 'No description for this category'}</dd>
            </dl>
          </div>

          <form onSubmit={this.handleSubmit} className="w-100 w-50-ns">
            <p className="lh-copy b">{statusMsg}</p>
            <div className="flex">
              <Link to={'/categories/edit'} className={`${sharedStyle} bg-mid-gray hover-bg-dark-gray tc`}>{(itemCount > 0) ? 'Go back' : 'No, go back'}</Link>
              <button type="submit" disabled={itemCount > 0} className={`${sharedStyle} bg-red ${(!(itemCount > 0)) ? 'hover-bg-dark-red' : ''} sans-serif`}>{(itemCount > 0) ? 'Disabled' : 'Yes, delete'}</button>
            </div>
          </form>
        </div>
      </section>
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
