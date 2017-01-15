import React from 'react';
import { router, Link } from 'react-router';
import { connect } from 'react-redux';
import actionsAll from '../actions/get-items';
import actionsSingle from '../actions/get-single-item';


class SingleItem extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(actionsAll.fetchItems());
    this.props.dispatch(actionsSingle.fetchSingleItem(this.props.params.id));
  }

  render() {
    if (Object.keys(this.props.items).length === 0) {
      return (
        <div className="mw5 mw8-ns center pa4 ph3-ns">
          <p>Loading item...</p>
        </div>
      );
    }

    const { name, serialNumber, notes, replaceValue, purchaseDate, placePurchased, receipt, image } = this.props.currentItem;

    return (
      <article>
        <div className="mw5 mw8-ns center pa4 ph3-ns">
          <h2>{name}</h2>
          <dl className="lh-title mv2">
            <dt className="dib mr2 b">Replacement Value:</dt>
            <dd className="dib ml0 dark-gray">${replaceValue}</dd>
          </dl>
          <dl className="lh-title mv2">
            <dt className="dib mr2 b">Serial Number:</dt>
            <dd className="dib ml0 dark-gray">{serialNumber}</dd>
          </dl>
          <dl className="lh-title mv2">
            <dt className="dib mr2 b">Purchase Date:</dt>
            <dd className="dib ml0 dark-gray">{purchaseDate}</dd>
          </dl>
          <dl className="lh-title mv2">
            <dt className="dib mr2 b">Place Purchased:</dt>
            <dd className="dib ml0 dark-gray">{placePurchased}</dd>
          </dl>
          <dl className="lh-title mv2">
            <dt className="dib mr2 b">Receipt:</dt>
            <dd className="dib ml0 dark-gray">{receipt}</dd>
          </dl>
          <dl className="lh-title mv2">
            <dt className="dib mr2 b">Notes:</dt>
            <dd className="dib ml0 dark-gray">{notes}</dd>
          </dl>
        </div>
      </article>
    );
  }
}


const mapStateToProps = (state, props) => {
  return {
    items: state.items,
    currentItem: state.items[props.params.id]
  }
};


export default connect(mapStateToProps)(SingleItem);
