import React from 'react';
import { router, Link } from 'react-router';
import { connect } from 'react-redux';
import actions from '../actions/get-owners';


class OwnersList extends React.component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // dispatch to get all owners
    this.props.dispatch(actions.fetchOwners(this.props.owners));
  }

  renderOwners(ownerId) {
    const { name, address, city, state, zip, phone, email } = this.props.owners[ownerId];
    return (
      <article key={ownerId} id={"owner-" + ownerId}>
        <Link to={'/owner/' + ownerId}>
          <h2>{name}</h2>
        </Link>
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
