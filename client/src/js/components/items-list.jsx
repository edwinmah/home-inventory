import React from 'react';
import { router, Link } from 'react-router';
import { connect } from 'react-redux';
import actions from '../actions/get-items';


class ItemsList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // dispatch to get all items
    this.props.dispatch(actions.fetchItems());
  }

  renderItems(itemId) {
    const { name, replaceValue, image } = this.props.items[itemId];
    const replaceValueCommas = replaceValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const imgStyle = (image === '/assets/image.svg') ? '' : 'ba b--light-silver br2';

    return (
      <article key={itemId} id={`item-${itemId}`} className="border-box w-100 w-50-m w-33-ns pa3">
        <Link to={`/item/${itemId}`} className="dark-blue dim link">
          <img src={`${image}`} alt={name} className={imgStyle} />
          <h3 className="f5">{name}</h3>
          <p className="f6"><span className="b">Replacement Value: </span>${replaceValueCommas}</p>
        </Link>
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

    let output, itemCount = 0;
    if (this.props.params.id !== undefined && categoryFilter.length === 0) {
      output = this.renderNoItems();
    }
    else if (this.props.params.id !== undefined) {
      output = categoryFilter.map((itemId) => this.renderItems(itemId));
      itemCount = categoryFilter.length;
    }
    else {
      output = keys.map((itemId) => this.renderItems(itemId));
      itemCount = keys.length;
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
            <p className="pa3">Loading items...</p>
          </div>
        </section>
      );
    }

    return (
      <section>
        <div className="mw6 mw8-ns center">
          <h2 className="pa3">{sectionTitle} <span className="f5 gray">({itemCount})</span></h2>
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
