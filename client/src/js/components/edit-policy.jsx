import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import actions from '../actions/edit-policy';
import { fetchPolicies } from '../actions/get-policies';


class EditPolicy extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    //dispatch to edit policy
    const req = {
      ownerId: this.refs.ownerId.value || this.props.currentPolicy.ownerId,
      company: this.refs.company.value,
      policyNumber: this.refs.policyNumber.value,
      coverage: this.refs.coverage.value,
      website: this.refs.website.value,
      phone: this.refs.phone.value,
      email: this.refs.email.value
    }
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

    const { _id, ownerId, company, policyNumber, coverage, website, phone, email } = this.props.currentPolicy;
    const keys = Object.keys(this.props.currentPolicy).slice(1, 8);

    return (
      <div className="mw6 center ph3">
        <article id={`item-${_id}`}>
          <h3>{company}</h3>
          <div className="flex flex-column">
            <form className="flex flex-column" onSubmit={this.handleSubmit}>
              {keys.map((property, i) => this.renderFormInputs(property, i))}
              <div className="flex flex-row">
                <Link to={'/account'} className="w-50 link bn br2 ph3 pv2 mr2 mv3 white bg-mid-gray hover-bg-dark-gray sans-serif tc">Cancel</Link>
                <button type="submit" className="w-50 link bn br2 ph3 pv2 ml2 mv3 white bg-dark-blue hover-bg-navy sans-serif">Save</button>
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
