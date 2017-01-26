import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import actions from '../actions/edit-owner';


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
      <p key={i} className="flex items-center mt0 mb2">
        <label htmlFor={property} className="w-20 b ttc">{property}:</label>
        <input type="text" name={property} id={property} className="w-80 input-reset ba b--black-20 br2 pa2 sans-serif" defaultValue={`${this.props.currentOwner[`${property}`]}`} ref={property} />
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

    const { _id, name, address, city, state, zip, phone, email } = this.props.currentOwner;
    const keys = Object.keys(this.props.currentOwner).slice(1, 8);

    return (
      <div className="mw6 center ph3">
        <article id={`item-${_id}`}>
          <h3>{name}</h3>
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
    owners: state.owners,
    currentOwner: state.owners[props.params.id]
  }
};


export default connect(mapStateToProps)(EditOwner);
