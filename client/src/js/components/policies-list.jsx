import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import EditPolicy from './edit-policy';
import { formatAsCurrency } from '../utils';


class PoliciesList extends React.Component {
  constructor(props) {
    super(props);
  }

  renderWebsiteLink(policyId) {
    return <a href={`${this.props.policies[policyId].website}`} className="dark-blue hover-navy link">{this.props.policies[policyId].website}</a>;
  }

  renderEmailLink(policyId) {
    return <a href={`mailto:${this.props.policies[policyId].email}`} className="dark-blue hover-navy link">{this.props.policies[policyId].email}</a>;
  }

  renderDefinitionLists(property, i) {
    const policyId = Object.keys(this.props.policies)[0];
    let ddValue, dtValue;
    switch (property) {
      case 'policyNumber' :
        dtValue = `${property.slice(0, 6)} ${property.slice(-6)}`;
        ddValue = '';
        break;
      case 'coverage' :
        dtValue = property;
        ddValue = `${formatAsCurrency(`${this.props.policies[policyId][property]}`)}`;
        break;
      case 'website' :
        dtValue = property;
        ddValue = this.renderWebsiteLink(policyId);
        break;
      case 'email' :
        dtValue = property;
        ddValue = this.renderEmailLink(policyId);
        break;
      default :
        dtValue = property;
        ddValue = this.props.policies[policyId][property];
        break;
    }

    return (
      <dl key={`${i}-${policyId}`} className="flex lh-title mv1">
        <dt className="mr2 b ttc">{dtValue}:</dt>
        <dd className="ml0 dark-gray">{ddValue}</dd>
      </dl>
    );
  }

  renderPolicies(policyId) {
    const keys = Object.keys(this.props.policies[policyId]).filter((property) => {
      return property !== '_id' && property !== '__v' && property !== 'ownerId' && property !== 'accessToken' && property !== 'company';
    });

    return (
      <article key={policyId} id={`policy-${policyId}`}>
        <h3>{this.props.policies[policyId].company}</h3>
        <div className="flex flex-column">
          {keys.map((property, i) => this.renderDefinitionLists(property, i))}
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
