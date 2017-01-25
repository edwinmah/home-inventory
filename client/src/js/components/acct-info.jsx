import React from 'react';
import { connect } from 'react-redux';
import OwnersList from './owners-list';
import PolicyList from './policies-list';
import actionsOwners from '../actions/get-owners';
import actionsPolicies from '../actions/get-policies';


class AcctInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // dispatch to get owners and policies
    this.props.dispatch(actionsOwners.fetchOwners());
    this.props.dispatch(actionsPolicies.fetchPolicies());
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <div className="mw6 mw8-ns center">
          <h2 className="pa3">Account Information</h2>
          <div className="flex flex-column flex-row-ns ph3">
            <OwnersList owners={this.props.owners} />
            <PolicyList policies={this.props.policies} />
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state, props) => {
  return {
    owners: state.owners,
    policies: state.policies
  }
};


export default connect(mapStateToProps)(AcctInfo);
