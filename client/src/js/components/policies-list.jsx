import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import actions from '../actions/get-policies';


class PoliciesList extends React.Component {
  constructor(props) {
    super(props);
  }

  renderPolicies(policyId) {
    const { ownerId, company, policyNumber, coverage, website, phone, email } = this.props.policies[policyId];
    const coverageCommas = coverage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return (
      <article key={policyId} id={`item-${policyId}`}>
        <h3>{company}</h3>
        <div className="flex flex-column">
          <div>
            <dl className="flex lh-title mv2">
              <dt className="mr2 b">Policy Number:</dt>
              <dd className="ml0 dark-gray">{policyNumber}</dd>
            </dl>
            <dl className="flex lh-title mv2">
              <dt className="mr2 b">Coverage:</dt>
              <dd className="ml0 dark-gray">${coverageCommas}</dd>
            </dl>
            <dl className="flex lh-title mv2">
              <dt className="mr2 b">Website:</dt>
              <dd className="ml0 dark-gray">{website}</dd>
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
          <Link to={`account/policy/edit`} className="w-50 w-25-l link br2 ph3 pv2 mv3 white bg-dark-blue hover-bg-navy tc">Edit Policy</Link>
        </div>
      </article>
    );
  }

  render() {
    return (
      <div className="w-100 w-50-ns">
        {Object.keys(this.props.policies).map((policyId) => this.renderPolicies(policyId))}
      </div>
    );
  }
}


export default PoliciesList;
