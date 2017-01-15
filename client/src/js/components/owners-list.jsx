import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions/get-owners';


class OwnersList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // dispatch to get all owners
    this.props.dispatch(actions.fetchOwners());
  }

  renderOwners(ownerId) {
    const { name, address, city, state, zip, phone, email } = this.props.owners[ownerId];
    return (
      <article key={ownerId} id={"owner-" + ownerId}>
        <h3>{name}</h3>
        <dl className="lh-title mv2">
          <dt className="dib mr2 b">Address:</dt>
          <dd className="dib ml0 dark-gray">{address}</dd>
        </dl>
        <dl className="lh-title mv2">
          <dt className="dib mr2 b">City:</dt>
          <dd className="dib ml0 dark-gray">{city}</dd>
        </dl>
        <dl className="lh-title mv2">
          <dt className="dib mr2 b">State:</dt>
          <dd className="dib ml0 dark-gray">{state}</dd>
        </dl>
        <dl className="lh-title mv2">
          <dt className="dib mr2 b">Zip Code:</dt>
          <dd className="dib ml0 dark-gray">{zip}</dd>
        </dl>
        <dl className="lh-title mv2">
          <dt className="dib mr2 b">Phone:</dt>
          <dd className="dib ml0 dark-gray">{phone}</dd>
        </dl>
        <dl className="lh-title mv2">
          <dt className="dib mr2 b">Email:</dt>
          <dd className="dib ml0 dark-gray">{email}</dd>
        </dl>
      </article>
    );
  }

  render() {
    return (
      <div>
        {Object.keys(this.props.owners).map((ownerId) => this.renderOwners(ownerId))}
      </div>
    );
  }
}


const mapStateToProps = (state, props) => {
  return {
    owners: state.owners
  }
};


export default connect(mapStateToProps)(OwnersList);
