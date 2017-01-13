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
        <Link to={'/item/' + itemId}>
          <h2>{name}</h2>
          <p><strong>Replacement Value: </strong>{replaceValue}</p>
        </Link>
      </article>
    );
  }

  render() {
    const keys = Object.keys(this.props.items);

    const categoryFilter = keys.filter((itemId) => {
      return this.props.params.id === this.props.items[itemId].categoryId;
    });

    let output;
    if (this.props.params.id !== undefined) {
      output = categoryFilter.map((itemId) => this.renderItems(itemId));
    } else {
      output = keys.map((itemId) => this.renderItems(itemId));
    }

    return (
      <section>
        <h2>{sectionTitle}</h2>
        {output}
      </section>
    );
  }
}


const mapStateToProps = (state, props) => {
  return {
    items: state.items
  }
};


export default connect(mapStateToProps)(ItemsList);
