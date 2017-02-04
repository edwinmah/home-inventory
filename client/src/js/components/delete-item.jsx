import React from 'react';
import { router, Link } from 'react-router';
import { connect } from 'react-redux';
import actions from '../actions/delete-item';
import { fetchItems } from '../actions/get-items';
import { formatAsCurrency } from '../utils';


class DeleteItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    document.body.scrollTop = 0;
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(actions.deleteSingleItem(this.props.params.id));
  }

  render() {
    if (!this.props.currentItem) {
      this.props.dispatch(fetchItems());
      return (
        <div className="mw6 mw8-ns center">
          <p className="pa3">Loading item...</p>
        </div>
      );
    }

    const { _id, name, categoryId, replaceValue } = this.props.currentItem;

    return (
      <div className="mw6 mw8-ns center ph3">
        <div className="flex flex-column items-center">
          <div className="w-100 w-50-ns mb4">
            <h2 className="pv3">{name}</h2>
            <dl className="flex lh-title mv2">
              <dt className="mr2 b">Replacement Value:</dt>
              <dd className="ml0 dark-gray">{formatAsCurrency(replaceValue)}</dd>
            </dl>
            <dl className="flex lh-title mv2">
              <dt className="mr2 b">Category:</dt>
              <dd className="ml0 dark-gray">
                <Link to={`/category/${categoryId}/items`} className="dark-blue hover-navy link">{this.props.categories[categoryId].name}</Link>
              </dd>
            </dl>
          </div>

          <form onSubmit={this.handleSubmit} className="w-100 w-50-ns">
            <p className="f5 f4-l b">Are you sure you want to delete this item?</p>
            <div className="flex">
              <Link to={`/item/${_id}`} className="w-50 f5 link bn br2 ph3 pv2 mr2 mv3 white bg-mid-gray hover-bg-dark-gray sans-serif tc">No, go back</Link>
              <button type="submit" className="w-50 f5 link bn br2 ph3 pv2 mr2 mv3 white bg-red hover-bg-dark-red tc">Yes, delete</button>
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
    currentItem: state.items[props.params.id]
  }
};


export default connect(mapStateToProps)(DeleteItem);
