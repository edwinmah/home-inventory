import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import actions from '../actions/edit-owner';
import { fetchOwners } from '../actions/get-owners';


class EditOwner extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    //dispatch to edit owner
    const req = {
      name: this.refs.name.value,
      address: this.refs.address.value,
      city: this.refs.city.value,
      state: this.refs.state.value,
      zip: this.refs.zip.value,
      phone: this.refs.phone.value,
      email: this.refs.email.value
    }
    this.props.dispatch(actions.editOwner(this.props.currentOwner._id, req));
  }

  renderFormInputs(property, i) {
    return (
      <p key={`${i}-${this.props.currentOwner._id}`} className="flex items-center mt0 mb2">
        <label htmlFor={property} className="w-20 b ttc">{property}:</label>
        <input type="text" name={property} id={property} className="w-80 input-reset ba b--black-20 br2 pa2 sans-serif" defaultValue={`${this.props.currentOwner[`${property}`]}`} ref={property} />
      </p>
    );
  }

  render() {
    if (!this.props.currentOwner) {
      this.props.dispatch(fetchOwners());
      return (
        <div className="mw6 mw8-ns center">
          <p className="pa3">Loading owner...</p>
        </div>
      );
    }

    const keys = Object.keys(this.props.currentOwner).filter((property) => {
      return property !== '_id' && property !== '__v' && property !== 'accessToken' && property !== 'googleId';
    });
    const sharedStyle = 'w-50 link bn br2 ph3 pv2 mv3 white';

    return (
      <div className="mw6 center ph3">
        <article id={`item-${this.props.currentOwner._id}`}>
          <h3>{this.props.currentOwner.name}</h3>
          <div className="flex flex-column">
            <form className="flex flex-column" onSubmit={this.handleSubmit}>
              {keys.map((property, i) => this.renderFormInputs(property, i))}
              <div className="flex flex-row">
                <Link to={'/account'} className={`${sharedStyle} mr2 bg-mid-gray hover-bg-dark-gray tc`}>Cancel</Link>
                <button type="submit" className={`${sharedStyle} ml2 bg-dark-blue hover-bg-navy sans-serif`}>Save</button>
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
    owners: state.owners,
    currentOwner: state.owners[props.params.id]
  }
};


export default connect(mapStateToProps)(EditOwner);
