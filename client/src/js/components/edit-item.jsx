import React from 'react';
import { router, Link } from 'react-router';
import { connect } from 'react-redux';
import actions from '../actions/edit-item';
import actionsCreate from '../actions/create-item';
import actionsOwners from '../actions/get-owners';
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
    if (!this.props.params.id) {
      this.props.dispatch(actionsOwners.fetchOwners());
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    //dispatch to edit/add item
    const req = {
      ownerId: this.props.currentItem.ownerId || Object.keys(this.props.owners)[0],
      categoryId: this.refs.category.value,
      name: this.refs.name.value,
      replaceValue: parseInt(this.refs.replaceValue.value),
      notes: this.refs.notes.value,
      serialNumber: this.refs.serialNumber.value,
      purchaseDate: this.refs.purchaseDate.state.inputValue,
      placePurchased: this.refs.placePurchased.value,
      image: this.state.imgUrl,
      receipt: this.state.recUrl
    }

    if (this.props.params.id) {
      this.props.dispatch(actions.editItem(this.props.currentItem._id, req));
    } else {
      this.props.dispatch(actionsCreate.createItem(req));
    }
  }

  handleImgUpload(...image) {
    this.setState(
      prevState => ({
        isImgUploadFinished: !prevState.isImgUploadFinished,
        imgUrl: `https://homeinventorybucket.s3.amazonaws.com/${image[0].filename}`
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
        recUrl: `https://homeinventorybucket.s3.amazonaws.com/${receipt[0].filename}`
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

  renderCategoryNames(categoryId) {
    const { name } = this.props.categories[categoryId];

    return (
      <option key={categoryId} id={`item-${categoryId}`} value={categoryId}>{name}</option>
    );
  }

  renderHeading() {
    if (!this.props.params.id) {
      return <h2 className="pv3">Add an item</h2>;
    }
  }

  render() {
    const { _id, categoryId, name, serialNumber, notes, replaceValue, purchaseDate, placePurchased, receipt, image } = this.props.currentItem;

    const style = { backgroundColor: '#ffffff'};
    const activeStyle = { backgroundColor: '#fbf1a9' };

    const uploadImgMsg = (this.state.isImgUploadFinished) ? 'Your image was uploaded successfully.' : 'Click or drag here to upload an image.';
    const uploadRecMsg = (this.state.isRecUploadFinished) ? 'Your receipt was uploaded successfully.' : 'Click or drag here to upload a receipt.';

    const dateInputProps = {
      id: 'purchaseDate',
      name: 'purchaseDate',
      className: 'db w-100 pa2 input-reset ba b--black-20 br2 sans-serif'
    };

    return (
      <div className="mw6 mw8-ns center ph3">
        {this.renderHeading()}
        <div className="flex flex-column flex-row-ns">
          <div className="w-100 w-50-ns mb3 mb0-ns mr4-ns">
            <DropzoneS3Uploader onFinish={this.handleImgUpload} style={style} activeStyle={activeStyle} multiple={false} maxFileSize={1024*1024*50} s3Url="https://homeinventorybucket.s3.amazonaws.com" className="flex items-center justify-center relative overflow-hidden vh-50 b--dashed bw1 b--black-20 br2 pointer">
              <img src={image} alt={name} className="h-auto w-50 nested-img img br2" />
            </DropzoneS3Uploader>
            <p>{uploadImgMsg}</p>
          </div>
          <form className="flex flex-column w-100 w-50-ns f5" onSubmit={this.handleSubmit}>
            <label htmlFor="name" className="b db mb2">Name:</label>
            <input type="text" name="name" id="name" className="db input-reset ba b--black-20 br2 pa2 mb3 sans-serif" defaultValue={name} ref="name" />

            <label htmlFor="replacementValue" className="b db mb2">Replacement Value:</label>
            <input type="text" name="replacementValue" id="replacementValue" className="db input-reset ba b--black-20 br2 pa2 mb3 sans-serif" defaultValue={replaceValue} ref="replaceValue" />

            <label htmlFor="category" className="b db mb2">Category:</label>
            <select name="category" id="category" className="pa2 mb3 sans-serif" ref="category">
              {Object.keys(this.props.categories).map((categoryId) => this.renderCategoryNames(categoryId))}
            </select>

            <label htmlFor="serialNumber" className="b db mb2">Serial Number:</label>
            <input type="text" name="serialNumber" id="serialNumber" className="db input-reset ba b--black-20 br2 pa2 mb3 sans-serif" defaultValue={serialNumber} ref="serialNumber" />

            <label htmlFor="purchaseDate" className="b db mb2">Purchase Date:</label>
            <Datetime closeOnSelect={true} timeFormat={false} dateFormat='ddd, MMM Do YYYY' inputProps={dateInputProps} className="mb3" defaultValue={purchaseDate} ref="purchaseDate" />

            <label htmlFor="purchasePlace" className="b db mb2">Place Purchased:</label>
            <input type="text" name="purchasePlace" id="purchasePlace" className="db input-reset ba b--black-20 br2 pa2 mb3 sans-serif" defaultValue={placePurchased} ref="placePurchased" />

            <label htmlFor="receiptUpload" className="b db mb2">Receipt:</label>
            <DropzoneS3Uploader onFinish={this.handleRecUpload} style={style} activeStyle={activeStyle} multiple={false} maxFileSize={1024*1024*50} s3Url="https://homeinventorybucket.s3.amazonaws.com" className="flex items-center justify-center relative h4 h5-l b--dashed bw1 b--black-20 br2 pointer">
              <img src={image} alt={name} className="h-auto w-25 nested-img img br2" />
            </DropzoneS3Uploader>
            <p className="ph2">{uploadRecMsg}</p>

            <label htmlFor="notes" className="b db mt3 mb2">Notes:</label>
            <textarea name="notes" id="notes" className="db border-box hover-black w-100 vh-25 measure ba b--black-20 pa2 br2 mb3 sans-serif" defaultValue={notes} ref="notes"></textarea>

            <div className="flex flex-row">
              <Link to={`/item/${_id}`} className="w-50 f5 link bn br2 ph3 pv2 mr2 mv3 white bg-mid-gray hover-bg-dark-gray sans-serif tc">Cancel</Link>
              <button type="submit" className="w-50 f5 link bn br2 ph3 pv2 ml2 mv3 white bg-dark-blue hover-bg-navy sans-serif">Save</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}


EditItem.defaultProps = {
  currentItem: {
    image: '/assets/image.svg',
    receipt: '/assets/image.svg'
  }
}


const mapStateToProps = (state, props) => {
  return {
    categories: state.categories,
    items: state.items,
    owners: state.owners,
    currentItem: state.items[props.params.id]
  }
};


export default connect(mapStateToProps)(EditItem);
