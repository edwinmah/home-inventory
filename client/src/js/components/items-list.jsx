import React from 'react';
import { router, Link } from 'react-router';
import { connect } from 'react-redux';
import { formatAsCurrency } from '../utils';


class ItemsList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.body.scrollTop = 0;
  }

  calcTotalValue(itemId) {
    return this.props.items[itemId].replaceValue;
  }

  renderItems(itemId) {
    const { name, categoryId, replaceValue, image } = this.props.items[itemId];
    const imgStyle = (image === '/assets/image.svg') ? '' : 'ba b--light-silver br2';

    return (
      <article key={itemId} id={`item-${itemId}`} className="border-box w-100 w-50-m w-33-ns pa3">
        <Link to={`/item/${itemId}`} className="dark-blue dim link">
          <img src={`${image}`} alt={name} className={imgStyle} />
          <div className="flex justify-between items-center">
            <h3 className="mb0 f5">{name}</h3>
            <p className="mb0"><span className="visuallyhidden focusable">Replacement Value of</span>{formatAsCurrency(replaceValue)}</p>
          </div>
        </Link>
        <p className="f6"><span className="mid-gray b">Category: </span>
          <Link to={`/category/${categoryId}/items`} className="dark-blue hover-navy link">{this.props.categories[categoryId].name}</Link>
        </p>
      </article>
    );
  }

  renderNoItems() {
    return <p className="pa3">There are currently no items in this category.</p>;
  }

  render() {
    const keys = Object.keys(this.props.items);

    const categoryFilter = keys.filter((itemId) => {
      return this.props.params.id === this.props.items[itemId].categoryId;
    });

    let output, itemCount = 0, totalValue;
    if (this.props.params.id !== undefined && categoryFilter.length === 0) {
      output = this.renderNoItems();
    }
    else if (this.props.params.id !== undefined) {
      output = categoryFilter.map((itemId) => this.renderItems(itemId));
      totalValue = categoryFilter.map((itemId) => this.calcTotalValue(itemId)).reduce((a,b) => a + b);
      itemCount = categoryFilter.length;
    }
    else {
      output = keys.map((itemId) => this.renderItems(itemId));
      itemCount = keys.length;
      if (itemCount > 0) {
        totalValue = keys.map((itemId) => this.calcTotalValue(itemId)).reduce((a,b) => a + b);
      }
    }

    let sectionTitle;
    if (Object.keys(this.props.categories).length > 0 && this.props.params.id !== undefined) {
      sectionTitle = this.props.categories[this.props.params.id].name;
    }
    else {
      sectionTitle = 'All Items';
    }

    if (keys.length === 0) {
      return (
        <section>
          <div className="mw6 mw8-ns center">
            <h2 className="pa3">{sectionTitle}</h2>
            <div className="flex flex-wrap">
              <p className="pa3">Loading items...</p>
              <div className="flex justify-center w-100 w-50-m w-33-ns pa3">
                <Link to={`/item/add`} className="flex flex-column items-center justify-center w-100 pa3 b--dashed bw1 b--black-20 br2 f4 b dark-blue link hover-bg-light-yellow tc">Add Item <span className="f1 b" dangerouslySetInnerHTML={{__html: '&plus;'}}></span></Link>
              </div>
            </div>
          </div>
        </section>
      );
    }

    return (
      <section>
        <div className="mw6 mw8-ns center">
          <div className="flex items-baseline">
            <h2 className="pa3">{sectionTitle}</h2>
            <span className="f5 b mid-gray">({itemCount}{(itemCount === 1) ? ' item' : ' items'}{(itemCount === 0) ? '' : ` worth ${formatAsCurrency(totalValue)}`})</span>
          </div>
          <div className="flex flex-wrap">
            {output}
            <div className="flex justify-center w-100 w-50-m w-33-ns pa3">
              <Link to={`/item/add`} className="flex flex-column items-center justify-center w-100 pa3 b--dashed bw1 b--black-20 br2 f4 b dark-blue link hover-bg-light-yellow tc">Add Item <span className="f1 b" dangerouslySetInnerHTML={{__html: '&plus;'}}></span></Link>
            </div>
          </div>
        </div>
      </section>
    );
  }
}


const mapStateToProps = (state, props) => {
  return {
    items: state.items,
    categories: state.categories
  }
};


export default connect(mapStateToProps)(ItemsList);
