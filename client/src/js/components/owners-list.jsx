import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import actions from '../actions/get-owners';



class OwnersList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // dispatch to get owners
    this.props.dispatch(actions.fetchOwners());
  }

  renderOwners(ownerId) {
    const { name, address, city, state, zip, phone, email } = this.props.owners[ownerId];
    const keys = Object.keys(this.props.owners[ownerId]).filter((property) => {
      return property !== '_id' && property !== '__v' && property !== 'accessToken' && property !== 'googleId';
    });

    return (
      <article key={ownerId} id={`owner-${ownerId}`}>
        <h3>{name}</h3>
        <div className="flex flex-column">
          <div>
            {keys.map((property, i) => {
              return (
                <dl key={`${i}-${ownerId}`} className="flex lh-title mv2">
                  <dt className="mr2 b ttc">{property}:</dt>
                  <dd className="ml0 dark-gray">{`${this.props.owners[ownerId][property]}`}</dd>
                </dl>
              );
            })}
          </div>
          <Link to={`/account/owner/edit/${ownerId}`} className="w-50 w-25-l link br2 ph3 pv2 mv3 white bg-dark-blue hover-bg-navy tc">Edit Owner</Link>
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


const mapStateToProps = (state, props) => {
  return {
    owners: state.owners
  }
};


export default connect(mapStateToProps)(OwnersList);
