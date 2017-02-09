import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { editPolicy } from '../actions/edit-policy';
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
    this.props.dispatch(editPolicy(this.props.currentPolicy._id, req));
  }

  renderFormInputs(property, i) {
    return (
      <p key={`${i}-${this.props.currentPolicy._id}`} className="flex items-center mt0 mb2">
        <label htmlFor={property} className="w-30 fw4 ttc">{property}:</label>
        <input type="text" name={property} id={property} className="w-70 input-reset ba b--black-20 br2 pa2 fw2 sans-serif" defaultValue={this.props.currentPolicy[property]} ref={property} />
      </p>
    );
  }

  render() {
    if (!this.props.currentPolicy) {
      return (
        <div className="mw6 mw8-ns center">
          <p className="pa3">Loading policy...</p>
        </div>
      );
    }

    const keys = Object.keys(this.props.currentPolicy).filter((property) => {
      return property !== '_id' && property !== '__v' && property !== 'ownerId' && property !== 'accessToken';
    });
    const sharedStyle = 'w-50 link bn br2 ph3 pv2 mv3 white fw4';

    return (
      <article id={`item-${this.props.currentPolicy._id}`} className="mw6 mw8-ns center ph3 ph0-l">
        <header className="mb4 bt bb b--black-20">
          <h2 className="mw6 center ph3 fw3 f4 tracked">{this.props.currentPolicy.company}</h2>
        </header>
        <div className="mw6 center ph3">
          <div className="flex flex-column">
            <form className="flex flex-column" onSubmit={this.handleSubmit}>
              {keys.map((property, i) => this.renderFormInputs(property, i))}
              <div className="flex flex-row">
                <Link to={'/account'} className={`${sharedStyle} mr2 bg-mid-gray hover-bg-dark-gray tc`}>Cancel</Link>
                <button type="submit" className={`${sharedStyle} ml2 bg-dark-blue hover-bg-navy sans-serif`}>Save</button>
              </div>
            </form>
          </div>
        </div>
      </article>
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
