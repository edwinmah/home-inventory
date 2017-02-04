import fetchAuth from '../fetchAuth';
import { hashHistory } from 'react-router';
import actions from './get-single-item';


const EDIT_ITEM_SUCCESS = 'EDIT_ITEM_SUCCESS';
const editItemSuccess = (item) => {
  return {
    type: EDIT_ITEM_SUCCESS,
    item: item
  };
};


const EDIT_ITEM_ERROR = 'EDIT_ITEM_ERROR';
const editItemError = (item, error) => {
  return {
    type: EDIT_ITEM_ERROR,
    item: item,
    error: error
  };
};


const editItem = (itemId, obj) => dispatch => {
  fetchAuth('PUT', `/item/${itemId}`, obj)
  .then((data) => {
    const item = data;
    return dispatch(editItemSuccess(item));
  })
  .then(() => {
    dispatch(actions.fetchSingleItem(itemId));
    hashHistory.push(`/item/${itemId}`);
    document.body.scrollTop = 0;
  })
  .catch((error) => {
    console.log(error);
    return dispatch(editItemError(error));
  });
};


exports.EDIT_ITEM_SUCCESS = EDIT_ITEM_SUCCESS;
exports.editItemSuccess   = editItemSuccess;

exports.EDIT_ITEM_ERROR = EDIT_ITEM_ERROR;
exports.editItemError   = editItemError;

exports.editItem  = editItem;
