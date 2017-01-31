import fetchAuth from '../fetchAuth';
import { hashHistory } from 'react-router';
import actions from './get-single-item';


var EDIT_ITEM_SUCCESS = 'EDIT_ITEM_SUCCESS';
var editItemSuccess = function(item) {
  return {
    type: EDIT_ITEM_SUCCESS,
    item: item
  };
};


var EDIT_ITEM_ERROR = 'EDIT_ITEM_ERROR';
var editItemError = function(item, error) {
  return {
    type: EDIT_ITEM_ERROR,
    item: item,
    error: error
  };
};


var editItem = (itemId, obj) => dispatch => {
  fetchAuth('PUT', `/item/${itemId}`, obj)
  .then(function(data) {
    var item = data;
    return dispatch(editItemSuccess(item));
  })
  .then(function() {
    dispatch(actions.fetchSingleItem(itemId));
    hashHistory.push(`/item/${itemId}`);
    document.body.scrollTop = 0;
  })
  .catch(function(error) {
    console.log(error);
    return dispatch(editItemError(error));
  });
};


exports.EDIT_ITEM_SUCCESS = EDIT_ITEM_SUCCESS;
exports.editItemSuccess   = editItemSuccess;

exports.EDIT_ITEM_ERROR = EDIT_ITEM_ERROR;
exports.editItemError   = editItemError;

exports.editItem  = editItem;
