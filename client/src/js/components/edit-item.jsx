import React from 'react';
import { router, Link } from 'react-router';
import { connect } from 'react-redux';
import actions from '../actions/edit-item';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';


class EditItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isImgUploadFinished: false,
      isRecUploadFinished: false,
      imgUrl: this.props.currentItem.image || '',
      recUrl: this.props.currentItem.receipt || ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImgUpload = this.handleImgUpload.bind(this);
    this.handleRecUpload = this.handleRecUpload.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    //dispatch to edit item
    this.props.dispatch(actions.editItem(
      this.props.currentItem._id,
      {
        _id: this.props.currentItem._id,
        ownerId: this.props.currentItem.ownerId,
        categoryId: this.props.currentItem.categoryId,
        name: this.refs.name.value,
        replaceValue: parseInt(this.refs.replaceValue.value),
        notes: this.refs.notes.value,
        serialNumber: this.refs.serialNumber.value,
        purchaseDate: this.refs.purchaseDate.value,
        placePurchased: this.refs.placePurchased.value,
        image: this.state.imgUrl,
        receipt: this.state.recUrl
      }
    ));
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
    }, 6000);
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
    }, 6000);
  }

  render() {
    const { _id, name, serialNumber, notes, replaceValue, purchaseDate, placePurchased, receipt, image } = this.props.currentItem;

    const activeStyle = {
      backgroundColor: '#96ccff'
    };

    const uploadImgMsg = (this.state.isImgUploadFinished) ? 'Your image was uploaded successfully.' : 'Click or drag here to upload an image.';
    const uploadRecMsg = (this.state.isRecUploadFinished) ? 'Your receipt was uploaded successfully.' : 'Click or drag here to upload a receipt.';

    return (
      <div className="flex flex-column flex-row-ns">
        <div className="w-100 w-50-ns mb3 mb0-ns mr4-ns">
          <DropzoneS3Uploader onFinish={this.handleImgUpload} style activeStyle={activeStyle} multiple={false} maxFileSize={1024*1024*50} s3Url="https://homeinventorybucket.s3.amazonaws.com" className="flex items-center justify-center relative vh-25 vh-50-l b--dashed bw1 b--black-20 br2 pointer">
            <p>{uploadImgMsg}</p>
          </DropzoneS3Uploader>
        </div>
        <form className="flex flex-column f5" onSubmit={this.handleSubmit}>
          <label htmlFor="name" className="b db mb2">Name:</label>
          <input type="text" id="name" className="db input-reset ba b--black-20 br2 pa2 mb3 sans-serif" defaultValue={name} ref="name" />

          <label htmlFor="replacementValue" className="b db mb2">Replacement Value:</label>
          <input type="text" id="replacementValue" className="db input-reset ba b--black-20 br2 pa2 mb3 sans-serif" defaultValue={replaceValue} ref="replaceValue" />

          <label htmlFor="serialNumber" className="b db mb2">Serial Number:</label>
          <input type="text" id="serialNumber" className="db input-reset ba b--black-20 br2 pa2 mb3 sans-serif" defaultValue={serialNumber} ref="serialNumber" />

          <label htmlFor="purchaseDate" className="b db mb2">Purchase Date:</label>
          <input type="text" id="purchaseDate" className="db input-reset ba b--black-20 br2 pa2 mb3 sans-serif" defaultValue={purchaseDate} ref="purchaseDate" />

          <label htmlFor="purchasePlace" className="b db mb2">Place Purchased:</label>
          <input type="text" id="purchasePlace" className="db input-reset ba b--black-20 br2 pa2 mb3 sans-serif" defaultValue={placePurchased} ref="placePurchased" />

          <label htmlFor="receiptUpload" className="b db mb2">Receipt:</label>
          <DropzoneS3Uploader onFinish={this.handleRecUpload} style activeStyle={activeStyle} multiple={false} maxFileSize={1024*1024*50} s3Url="https://homeinventorybucket.s3.amazonaws.com" className="flex items-center justify-center relative h3 h4-l b--dashed bw1 b--black-20 br2 pointer">
            <p className="ph2">{uploadRecMsg}</p>
          </DropzoneS3Uploader>

          <label htmlFor="notes" className="b db mt3 mb2">Notes:</label>
          <textarea id="notes" className="db border-box hover-black w-100 vh-25 measure ba b--black-20 pa2 br2 mb3 sans-serif" defaultValue={notes} ref="notes"></textarea>

          <div className="flex flex-row">
            <Link to={`/item/${_id}`} className="w-50 f5 link bn br2 ph3 pv2 mr2 mv3 white bg-mid-gray hover-bg-dark-gray sans-serif tc">Cancel</Link>
            <button type="submit" className="w-50 f5 link bn br2 ph3 pv2 ml2 mv3 white bg-dark-blue hover-bg-navy sans-serif">Save</button>
          </div>
        </form>
      </div>
    );
  }

}


const mapStateToProps = (state, props) => {
  return {
    items: state.items,
    currentItem: state.items[props.params.id]
  }
};


export default connect(mapStateToProps)(EditItem);
