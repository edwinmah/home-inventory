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
        <article>
          <p>Loading item...</p>
        </article>
      );
    }

    const { name, replaceValue } = this.props.currentItem;

    return (
      <article>
        <h2>{name}</h2>
        <p><strong>Replacement Value: </strong>{replaceValue}</p>
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
