import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchOwners } from '../actions/get-owners';
import { deleteCategory } from '../actions/delete-category';
import { createCategory } from '../actions/create-category';
import { editCategory } from '../actions/edit-category';


class EditCategory extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    document.body.scrollTop = 0;
    if (!this.props.params.id) {
      this.props.dispatch(fetchOwners());
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const req = {
      ownerId: Object.keys(this.props.owners)[0],
      name: this.refs.name.value,
      description: this.refs.description.value
    }

    if (this.props.params.id) {
      this.props.dispatch(editCategory(this.props.currentCategory._id, req));
    } else {
      this.props.dispatch(createCategory(req));
    }
  }

  renderFormInputs(property, i) {
    return (
      <p key={`${i}-${this.props.currentCategory._id}`} className="flex items-center mt0 mb2">
        <label htmlFor={property} className="w-25 b ttc">{property}:</label>
        <input type="text" name={property} id={property} className="w-75 input-reset ba b--black-20 br2 pa2 sans-serif" defaultValue={`${this.props.currentCategory[`${property}`]}`} ref={property} />
      </p>
    );
  }

  renderDeleteLink() {
    return (
      <Link to={`/category/delete/${this.props.params.id}`} className="w-third link bn br2 ph3 pv2 mr2 mv3 white bg-red hover-bg-dark-red tc">Delete</Link>
    );
  }

  render() {
    if (!this.props.currentCategory) {
      return (
        <div className="w-100 w-50-ns">
          <p>Loading...</p>
        </div>
      );
    }

    const { _id, name, description } = this.props.currentCategory;
    const widthStyle  = (!this.props.params.id) ? 'w-50' : 'w-third';
    const sharedStyle = 'link bn br2 ph3 pv2 mr2 mv3 white';
    const cancelStyle = 'bg-mid-gray hover-bg-dark-gray tc';
    const saveStyle   = 'bg-dark-blue hover-bg-navy';

    const keys = Object.keys(this.props.currentCategory).filter((property) => {
      return property !== '_id' && property !== '__v' && property !== 'ownerId';
    });

    return (
      <section className="w-100 w-50-ns">
        <h2 className="ttc">{(!this.props.params.id) ? 'Add a category' : name}</h2>
        <form onSubmit={this.handleSubmit}>
          {keys.map((property, i) => this.renderFormInputs(property, i))}
          <div className="flex flex-row">
            <Link to={'/categories'} className={`${widthStyle} ${sharedStyle} ${cancelStyle}`}>Cancel</Link>
            {(this.props.params.id) ? this.renderDeleteLink() : ''}
            <button type="submit" className={`${widthStyle} ${sharedStyle} ${saveStyle}`}>Save</button>
          </div>
        </form>
      </section>
    );
  }
}


EditCategory.defaultProps = {
  currentCategory: {
    name: 'Category name',
    description: 'Category description'
  }
}


const mapStateToProps = (state, props) => {
  return {
    categories: state.categories,
    owners: state.owners,
    currentCategory: state.categories[props.params.id]
  }
};


export default connect(mapStateToProps)(EditCategory);
