import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import actions from '../actions/get-owners';


class OwnersList extends React.Component {
  constructor(props) {
    super(props);
  }

  renderOwners(ownerId) {
    const { name, address, city, state, zip, phone, email } = this.props.owners[ownerId];
    return (
      <article key={ownerId} id={`owner-${ownerId}`}>
        <h3>{name}</h3>
        <div className="flex flex-column">
          <div>
            <dl className="flex lh-title mv2">
              <dt className="mr2 b">Address:</dt>
              <dd className="ml0 dark-gray">{address}</dd>
            </dl>
            <dl className="flex lh-title mv2">
              <dt className="mr2 b">City:</dt>
              <dd className="ml0 dark-gray">{city}</dd>
            </dl>
            <dl className="flex lh-title mv2">
              <dt className="mr2 b">State:</dt>
              <dd className="ml0 dark-gray">{state}</dd>
            </dl>
            <dl className="flex lh-title mv2">
              <dt className="mr2 b">Zip Code:</dt>
              <dd className="ml0 dark-gray">{zip}</dd>
            </dl>
            <dl className="flex lh-title mv2">
              <dt className="mr2 b">Phone:</dt>
              <dd className="ml0 dark-gray">{phone}</dd>
            </dl>
            <dl className="flex lh-title mv2">
              <dt className="mr2 b">Email:</dt>
              <dd className="ml0 dark-gray">{email}</dd>
            </dl>
          </div>
          <Link to={`account/owner/edit`} className="w-50 w-25-l link br2 ph3 pv2 mv3 white bg-dark-blue hover-bg-navy tc">Edit Owner</Link>
        </div>
      </article>
    );
  }

  render() {
    if (!this.props.owners) {
      return (
        <div className="mw6 mw8-ns center">
          <p className="pa3">Loading owner...</p>
        </div>
      );
    }

    return (
      <div className="w-100 w-50-ns">
        {Object.keys(this.props.owners).map((ownerId) => this.renderOwners(ownerId))}
      </div>
    );
  }
}


export default OwnersList;
