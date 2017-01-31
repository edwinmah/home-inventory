import fetchAuth from '../fetchAuth';
import { hashHistory } from 'react-router';


var DELETE_SINGLE_ITEM_SUCCESS = 'DELETE_SINGLE_ITEM_SUCCESS';
var deleteSingleItemSuccess = function(itemId) {
  return {
    type: DELETE_SINGLE_ITEM_SUCCESS,
    itemId: itemId
  };
};


var DELETE_SINGLE_ITEM_ERROR = 'DELETE_SINGLE_ITEM_ERROR';
var deleteSingleItemError = function(itemId, error) {
  return {
    type: DELETE_SINGLE_ITEM_ERROR,
    itemId: itemId,
    error: error
  };
};


var deleteSingleItem = (itemId) => dispatch => {
  fetchAuth('DELETE', `/item/${itemId}`)
  .then(function(item) {
    return dispatch(deleteSingleItemSuccess(item._id));
  })
  .then(function() {
    hashHistory.push('/');
  })
  .catch(function(error) {
    console.log(error);
    return dispatch(deleteSingleItemError(error));
  });
};


exports.DELETE_SINGLE_ITEM_SUCCESS = DELETE_SINGLE_ITEM_SUCCESS;
exports.deleteSingleItemSuccess    = deleteSingleItemSuccess;

exports.DELETE_SINGLE_ITEM_ERROR = DELETE_SINGLE_ITEM_ERROR;
exports.deleteSingleItemError    = deleteSingleItemError;

exports.deleteSingleItem  = deleteSingleItem;
