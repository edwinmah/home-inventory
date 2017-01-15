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
    const { ownerId, categoryId, name, serialNumber, notes, replaceValue, placePurchased, purchaseDate, receipt, image } = this.props.items[itemId];

    return (
      <article key={itemId} id={"item-" + itemId}>
        <Link to={'/item/' + itemId} className="dark-blue hover-navy link">
          <h3>{name}</h3>
          <p><strong>Replacement Value: </strong>{replaceValue}</p>
        </Link>
      </article>
    );
  }

  renderNoItems() {
    return <p>There are currently no items in this category.</p>;
  }

  render() {
    const keys = Object.keys(this.props.items);

    const categoryFilter = keys.filter((itemId) => {
      return this.props.params.id === this.props.items[itemId].categoryId;
    });

    let output;
    if (this.props.params.id !== undefined && categoryFilter.length === 0) {
      output = this.renderNoItems();
    }
    else if (this.props.params.id !== undefined) {
      output = categoryFilter.map((itemId) => this.renderItems(itemId));
    }
    else {
      output = keys.map((itemId) => this.renderItems(itemId));
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
          <div className="mw5 mw8-ns center pa4 ph3-ns">
            <h2>{sectionTitle}</h2>
            <p>Loading items...</p>
          </div>
        </section>
      );
    }

    return (
      <section>
        <div className="mw5 mw8-ns center pa4 ph3-ns">
          <h2>{sectionTitle}</h2>
          {output}
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
