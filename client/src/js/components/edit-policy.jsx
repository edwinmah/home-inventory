import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import actions from '../actions/edit-policy';
import { fetchPolicies } from '../actions/get-policies';
import { sanitizeNumber } from '../utils';


class EditPolicy extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    //dispatch to edit policy
    const req = {
      ownerId: this.props.currentPolicy.ownerId,
      company: this.refs.company.value,
      policyNumber: this.refs.policyNumber.value,
      coverage: sanitizeNumber(this.refs.coverage.value),
      website: this.refs.website.value,
      phone: this.refs.phone.value,
      email: this.refs.email.value
    };
    this.props.dispatch(actions.editPolicy(this.props.currentPolicy._id, req));
  }

  renderFormInputs(property, i) {
    const isDisabled = (property === 'ownerId');

    return (
      <p key={`${i}-${this.props.currentPolicy._id}`} className="flex items-center mt0 mb2">
        <label htmlFor={property} className="w-30 b ttc">{property}:</label>
        <input type="text" name={property} id={property} disabled={isDisabled} className="w-70 input-reset ba b--black-20 br2 pa2 sans-serif" defaultValue={`${this.props.currentPolicy[`${property}`]}`} ref={property} />
      </p>
    );
  }

  render() {
    if (!this.props.currentPolicy) {
      this.props.dispatch(fetchPolicies());
      return (
        <div className="mw6 mw8-ns center">
          <p className="pa3">Loading policy...</p>
        </div>
      );
    }

    const keys = Object.keys(this.props.currentPolicy).filter((property) => {
      return property !== '_id' && property !== '__v' && property !== 'ownerId' && property !== 'accessToken';
    });
    const sharedStyle = 'w-50 link bn br2 ph3 pv2 mv3 white';

    return (
      <div className="mw6 center ph3">
        <article id={`item-${this.props.currentPolicy._id}`}>
          <h3>{this.props.currentPolicy.company}</h3>
          <div className="flex flex-column">
            <form className="flex flex-column" onSubmit={this.handleSubmit}>
              {keys.map((property, i) => this.renderFormInputs(property, i))}
              <div className="flex flex-row">
                <Link to={'/account'} className={`${sharedStyle} mr2 bg-mid-gray hover-bg-dark-gray tc`}>Cancel</Link>
                <button type="submit" className={`${sharedStyle} ml2 bg-dark-blue hover-bg-navy`}>Save</button>
              </div>
            </form>
          </div>
        </article>
      </div>
    );
  }
}


const mapStateToProps = (state, props) => {
  return {
    policies: state.policies,
    currentPolicy: state.policies[props.params.id]
  }
};


export default connect(mapStateToProps)(EditPolicy);
