import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { deleteSingleItem } from '../actions/delete-item';
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
    this.props.dispatch(deleteSingleItem(this.props.params.id));
  }

  render() {
    if (!this.props.currentItem) {
      return (
        <div className="mw6 mw8-ns center">
          <p className="pa3">Loading item...</p>
        </div>
      );
    }

    const { _id, name, categoryId, replaceValue } = this.props.currentItem;
    const sharedStyles = 'w-50 f5 link bn br2 ph3 pv2 mr2 mv3 white';

    return (
      <section className="mw6 mw8-ns center ph3 ph0-l">
        <header className="mb4 bt bb b--black-20">
          <h2 className="mw6 center ph3">{name}</h2>
        </header>
        <div className="flex flex-column items-center">
          <div className="w-100 w-50-ns mb4">
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
              <Link to={`/item/${_id}`} className={`${sharedStyles} bg-mid-gray hover-bg-dark-gray tc`}>No, go back</Link>
              <button type="submit" className={`${sharedStyles} bg-red hover-bg-dark-red sans-serif tc`}>Yes, delete</button>
            </div>
          </form>
        </div>
      </section>
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
