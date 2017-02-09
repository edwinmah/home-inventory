import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { editOwner } from '../actions/edit-owner';


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
    this.props.dispatch(editOwner(this.props.currentOwner._id, req));
  }

  renderFormInputs(property, i) {
    return (
      <p key={`${i}-${this.props.currentOwner._id}`} className="flex items-center mt0 mb2">
        <label htmlFor={property} className="w-20 fw4 ttc">{property}:</label>
        <input type="text" name={property} id={property} className="w-80 input-reset ba b--black-20 br2 pa2 fw2 sans-serif" defaultValue={this.props.currentOwner[property]} ref={property} />
      </p>
    );
  }

  render() {
    if (!this.props.currentOwner) {
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
      <article id={`item-${this.props.currentOwner._id}`} className="mw6 mw8-ns center ph3 ph0-l">
        <header className="mb4 bt bb b--black-20">
          <h2 className="mw6 center ph3 fw3 f4 tracked">{this.props.currentOwner.name}</h2>
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
    owners: state.owners,
    currentOwner: state.owners[props.params.id]
  }
};


export default connect(mapStateToProps)(EditOwner);
