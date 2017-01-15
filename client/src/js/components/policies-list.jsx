import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions/get-policies';


class PoliciesList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // dispatch to get all policies
    this.props.dispatch(actions.fetchPolicies());
  }

  renderPolicies(policyId) {
    const { ownerId, company, policyNumber, coverage, website, phone, email } = this.props.policies[policyId];
    return (
      <article key={policyId} id={"item-" + policyId}>
        <h3>{company}</h3>
        <dl className="lh-title mv2">
          <dt className="dib mr2 b">Policy Number:</dt>
          <dd className="dib ml0 dark-gray">{policyNumber}</dd>
        </dl>
        <dl className="lh-title mv2">
          <dt className="dib mr2 b">Coverage:</dt>
          <dd className="dib ml0 dark-gray">${coverage}</dd>
        </dl>
        <dl className="lh-title mv2">
          <dt className="dib mr2 b">Website:</dt>
          <dd className="dib ml0 dark-gray">{website}</dd>
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
