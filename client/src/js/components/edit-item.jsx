import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { editItem } from '../actions/edit-item';
import { createItem } from '../actions/create-item';
import { fetchOwners } from '../actions/get-owners';
import { sanitizeNumber } from '../utils';
import { s3bucketName } from '../s3bucket-name';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';
import Datetime from 'react-datetime';


class EditItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isImgUploadFinished: false,
      isRecUploadFinished: false,
      imgUrl: this.props.currentItem.image,
      recUrl: this.props.currentItem.receipt
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImgUpload = this.handleImgUpload.bind(this);
    this.handleRecUpload = this.handleRecUpload.bind(this);
  }

  componentDidMount() {
    document.body.scrollTop = 0;
    if (!this.props.params.id) {
      this.props.dispatch(fetchOwners());
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    //dispatch to edit/add item
    const req = {
      ownerId: Object.keys(this.props.owners)[0],
      categoryId: this.refs.category.value,
      name: this.refs.name.value,
      replaceValue: sanitizeNumber(this.refs.replaceValue.value),
      notes: this.refs.notes.value,
      serialNumber: this.refs.serialNumber.value,
      purchaseDate: this.refs.purchaseDate.state.inputValue,
      placePurchased: this.refs.placePurchased.value,
      image: this.state.imgUrl,
      receipt: this.state.recUrl
    };

    if (this.props.params.id) {
      this.props.dispatch(editItem(this.props.currentItem._id, req));
    } else {
      this.props.dispatch(createItem(req));
    }
  }

  handleImgUpload(...image) {
    this.setState(
      prevState => ({
        isImgUploadFinished: !prevState.isImgUploadFinished,
        imgUrl: `https://${s3bucketName}.s3.amazonaws.com/${image[0].filename}`
      })
    );
    setTimeout(() => {
      this.setState(
        prevState => ({
          isImgUploadFinished: !prevState.isImgUploadFinished
        })
      )
    }, 2000);
  }

  handleRecUpload(...receipt) {
    this.setState(
      prevState => ({
        isRecUploadFinished: !prevState.isRecUploadFinished,
        recUrl: `https://${s3bucketName}.s3.amazonaws.com/${receipt[0].filename}`
      })
    );
    setTimeout(() => {
      this.setState(
        prevState => ({
          isRecUploadFinished: !prevState.isRecUploadFinished
        })
      )
    }, 2000);
  }

  renderDropZone(property) {
    const uploadImgMsg   = (this.state.isImgUploadFinished) ? 'Your image was uploaded successfully.' : 'Click or drag here to upload an image.';
    const uploadRecMsg   = (this.state.isRecUploadFinished) ? 'Your receipt was uploaded successfully.' : 'Click or drag here to upload a receipt.';
    const finishUpload   = (property === 'image') ? this.handleImgUpload : this.handleRecUpload;
    const dropZoneHeight = (property === 'image') ? 'vh-50' : 'h5';

    return (
      <div>
        <p className="mt0 mb2 b ttc">{property}:</p>
        <DropzoneS3Uploader onFinish={finishUpload} style={{backgroundColor: '#ffffff'}} activeStyle={{backgroundColor: '#fbf1a9'}} multiple={false} maxFileSize={1024*1024*50} s3Url={`https://${s3bucketName}.s3.amazonaws.com`} className={`flex justify-center items-center overflow-hidden h5 b--dashed bw1 b--black-20 br2 pointer`}>
          <img src={this.props.currentItem[property]} alt={this.props.currentItem.name} className="h4 nested-img img br2" />
        </DropzoneS3Uploader>
        <p className="mb4">{(property === 'image') ? uploadImgMsg : uploadRecMsg}</p>
      </div>
    );
  }

  renderNotesTextArea(property) {
    return (
      <textarea name={property} id={property} className="hover-black h3 measure ba b--black-20 pa2 br2 mb3 sans-serif" defaultValue={this.props.currentItem[property]} ref={property}></textarea>
    );
  }

  renderDatePicker(property) {
    const dateInputProps = {
      id: 'purchaseDate',
      name: 'purchaseDate',
      className: 'db w-100 pa2 input-reset ba b--black-20 br2 sans-serif'
    };

    return (
      <Datetime closeOnSelect={true} timeFormat={false} dateFormat='ddd, MMM Do YYYY' inputProps={dateInputProps} className="mb3" defaultValue={this.props.currentItem[property]} ref={property} />
    );
  }

  renderCategorySelect() {
    return (
      <select name="category" id="category" className="pa2 mb3 sans-serif" defaultValue={this.props.currentItem.categoryId} ref="category">
        {Object.keys(this.props.categories).map((categoryId) => {
          return <option key={categoryId} id={`item-${categoryId}`} value={categoryId}>{this.props.categories[categoryId].name}</option>
        })}
      </select>
    );
  }

  renderInputs(property) {
    return (
      <input type="text" name={property} id={property} className="input-reset ba b--black-20 br2 pa2 mb3 sans-serif" defaultValue={this.props.currentItem[property]} ref={property} />
    );
  }

  renderForm(property, i) {
    let formField  = this.renderInputs(property);
    let labelValue = property;

    switch (property) {
      case 'notes' :
        formField = this.renderNotesTextArea(property);
        break;
      case 'purchaseDate' :
        labelValue = `${property.slice(0, 8)} ${property.slice(-4)}`;
        formField  = this.renderDatePicker(property);
        break;
      case 'categoryId' :
        labelValue = `${property.slice(0, 8)}`;
        formField  = this.renderCategorySelect();
        break;
      case 'serialNumber' :
        labelValue = `${property.slice(0, 6)} ${property.slice(-6)}`;
        break;
      case 'replaceValue' :
        labelValue = `${property.slice(0, 7)}ment ${property.slice(-5)}`;
        break;
      case 'placePurchased' :
        labelValue = `${property.slice(0, 5)} ${property.slice(-9)}`;
        break;
    }

    return (
      <div key={`${i}-${this.props.currentItem._id}`} className="flex flex-column mt0 mb2">
        <label htmlFor={property} className="mb2 b ttc">{labelValue}:</label>
        {formField}
      </div>
    )
  }

  renderHeading() {
    if (!this.props.params.id) {
      return <h2 className="pv3">Add an item</h2>;
    }
  }

  render() {
    const keys = Object.keys(this.props.currentItem).filter((property) => {
      return property !== '_id' && property !== '__v' && property !== 'ownerId' && property !== 'accessToken' && property !== 'image' && property !== 'receipt';
    });
    const sharedStyle = 'w-50 link bn br2 ph3 pv2 mv3 white tc';

    return (
      <div className="mw6 mw8-ns center ph3">
        {this.renderHeading()}
        <div className="flex flex-column flex-row-ns">
          <div className="order-2 order-1-ns w-100 w-50-ns mb3 mb0-ns mr4-ns">
            {this.renderDropZone('image')}
            {this.renderDropZone('receipt')}
          </div>
          <form className="flex flex-column order-1 order-2-ns mb4 mb0-ns w-100 w-50-ns" onSubmit={this.handleSubmit}>
            {keys.map((property, i) => this.renderForm(property, i))}

            <div className="flex flex-row">
              <Link to={`/item/${this.props.currentItem._id}`} className={`${sharedStyle} mr2 bg-mid-gray hover-bg-dark-gray tc`}>Cancel</Link>
              <button type="submit" className={`${sharedStyle} ml2 bg-dark-blue hover-bg-navy sans-serif`}>Save</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}


EditItem.defaultProps = {
  currentItem: {
    categoryId: '',
    name: '',
    serialNumber: '',
    notes: '',
    replaceValue: 0,
    purchaseDate: '',
    placePurchased: '',
    image: '/assets/image.svg',
    receipt: '/assets/image.svg',
  }
}


const mapStateToProps = (state, props) => {
  return {
    categories: state.categories,
    owners: state.owners,
    currentItem: state.items[props.params.id]
  }
};


export default connect(mapStateToProps)(EditItem);
