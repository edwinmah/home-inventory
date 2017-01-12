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
    return (
      <section>
        <h2>All Items</h2>
        {Object.keys(this.props.items).map((itemId) => this.renderItems(itemId))}
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
