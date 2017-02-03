import React from 'react';
import { router, Link } from 'react-router';
import { connect } from 'react-redux';
import actions from '../actions/get-single-item';
import EditItem from './edit-item';
import { formatAsCurrency } from '../utils';


class SingleItem extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.body.scrollTop = 0;
    this.props.dispatch(actions.fetchSingleItem(this.props.params.id));
  }

  renderSingleItem() {
    const { name, categoryId, serialNumber, notes, replaceValue, purchaseDate, placePurchased, receipt, image } = this.props.currentItem;
    const imgStyle = (image === '/assets/image.svg') ? '' : 'ba b--light-silver br2';

    if (this.props.children) {
      return <EditItem params={this.props.params} />;
    } else {
      return (
        <div className="mw6 mw8-ns center ph3">
          <div className="flex flex-column flex-row-ns">
            <div className="w-100 w-50-ns mb3 mb0-ns mr4-ns">
              <img src={`${image}`} alt={name} className={imgStyle} />
            </div>
            <div className="w-100 w-50-ns f5 f4-l">
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
              <dl className="flex lh-title mv2">
                <dt className="mr2 b">Serial Number:</dt>
                <dd className="ml0 dark-gray">{serialNumber}</dd>
              </dl>
              <dl className="flex lh-title mv2">
                <dt className="mr2 b">Purchase Date:</dt>
                <dd className="ml0 dark-gray">{purchaseDate}</dd>
              </dl>
              <dl className="flex lh-title mv2">
                <dt className="mr2 b">Place Purchased:</dt>
                <dd className="ml0 dark-gray">{placePurchased}</dd>
              </dl>
              <dl className="flex lh-title mv2">
                <dt className="mr2 b">Receipt:</dt>
                <dd className="ml0"><a href={`${receipt}`} className="dark-blue hover-navy link">View receipt</a></dd>
              </dl>
              <dl className="flex lh-title mv2">
                <dt className="mr2 b">Notes:</dt>
                <dd className="ml0 dark-gray">{notes}</dd>
              </dl>
              <div className="flex edit tr">
                <Link to={`${this.props.location.pathname}/delete`} className="w-50 f5 link br2 ph3 pv2 mr2 mv3 white bg-red hover-bg-dark-red tc">Delete Item</Link>
                <Link to={`${this.props.location.pathname}/edit`} className="w-50 f5 link br2 ph3 pv2 ml2 mv3 white bg-dark-blue hover-bg-navy tc">Edit Item</Link>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    if (!this.props.currentItem) {
      return (
        <div className="mw6 mw8-ns center">
          <p className="pa3">Loading item...</p>
        </div>
      );
    }

    return (
      <article>
        <div className="mw6 mw8-ns center">
          <h2 className="pa3">{this.props.currentItem.name}</h2>
          {this.renderSingleItem()}
        </div>
      </article>
    );
  }
}


const mapStateToProps = (state, props) => {
  return {
    categories: state.categories,
    currentItem: state.items[props.params.id]
  }
};


export default connect(mapStateToProps)(SingleItem);
