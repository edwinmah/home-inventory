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
        <div className="mw6 mw8-ns center">
          <p className="pa3">Loading item...</p>
        </div>
      );
    }

    const { name, serialNumber, notes, replaceValue, purchaseDate, placePurchased, receipt, image } = this.props.currentItem;
    const replaceValueCommas = replaceValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const purchaseDatePretty = (new Date(purchaseDate)).toDateString();

    return (
      <article>
        <div className="mw6 mw8-ns center ph3">
          <h2 className="pv3">{name}</h2>
          <div className="flex flex-column flex-row-ns">
            <div className="w-100 w-50-ns mb3 mb0-ns mr4-ns">
              <img src="https://unsplash.it/480/480/?random" alt="a random image from Unsplash" className="ba b--light-silver br2" />
            </div>
            <div className="flex flex-column f5 f4-l">
              <dl className="lh-title mv2">
                <dt className="dib mr2 b">Replacement Value:</dt>
                <dd className="dib ml0 dark-gray">${replaceValueCommas}</dd>
              </dl>
              <dl className="lh-title mv2">
                <dt className="dib mr2 b">Serial Number:</dt>
                <dd className="dib ml0 dark-gray">{serialNumber}</dd>
              </dl>
              <dl className="lh-title mv2">
                <dt className="dib mr2 b">Purchase Date:</dt>
                <dd className="dib ml0 dark-gray">{purchaseDatePretty}</dd>
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
          </div>
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
