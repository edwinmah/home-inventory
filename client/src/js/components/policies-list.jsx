import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import EditPolicy from './edit-policy';
import actions from '../actions/get-policies';


class PoliciesList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // dispatch to get policies
    this.props.dispatch(actions.fetchPolicies());
  }

  formatCurrency(number) {
    return `$${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  }

  renderPolicies(policyId) {
    const { ownerId, company, policyNumber, coverage, website, phone, email } = this.props.policies[policyId];
    const coverageCommas = coverage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const keys = Object.keys(this.props.policies[policyId]).filter((property) => {
      return property !== '_id' && property !== '__v' && property !== 'ownerId';
    });

    return (
      <article key={policyId} id={`item-${policyId}`}>
        <h3>{company}</h3>
        <div className="flex flex-column">
          <div>
            {keys.map((property, i) => {
              return (
                <dl key={`${i}-${policyId}`} className="flex lh-title mv2">
                  <dt className="mr2 b ttc">{property}:</dt>
                  <dd className="ml0 dark-gray">
                    {(property === 'coverage') ? `${this.formatCurrency(`${this.props.policies[policyId][property]}`)}` : `${this.props.policies[policyId][property]}`}
                  </dd>
                </dl>
              );
            })}
          </div>
          <Link to={`account/policy/edit/${policyId}`} className="w-50 w-25-l link br2 ph3 pv2 mv3 white bg-dark-blue hover-bg-navy tc">Edit Policy</Link>
        </div>
      </article>
    );
  }

  render() {
    if (!this.props.policies) {
      return (
        <div className="mw6 mw8-ns center">
          <p className="pa3">Loading policy...</p>
        </div>
      );
    }

    return (
      <div className="w-100 w-50-ns">
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
