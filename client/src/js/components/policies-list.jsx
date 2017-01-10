import React from 'react';
import { router, Link } from 'react-router';
import { connect } from 'react-redux';
import actions from '../actions/get-policies';


class PoliciesList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // dispatch to get all policies
    this.props.dispatch(actions.fetchPolicies(this.props.policies));
  }

  renderPolicies(policyId) {
    const { ownerId, company, policyNumber, coverage, website, phone, email } = this.props.policies[policyId];
    const tempStyle = { 'color': 'red'};
    return (
      <article key={policyId} id={"item-" + policyId}>
        <Link to={'/policy/' + policyId} style={tempStyle}>
          <h2>{company}</h2>
        </Link>
      </article>
    );
  }

  render() {
    return (
      <div>
        {Object.keys(this.props.policies).map((policyId) => this.renderPolicies(policyId))}
      </div>
    );
  }
}


const mapStateToProps = (state, props) => {
  return {
    policies: state.policies
  }
};


export default connect(mapStateToProps)(PoliciesList);
