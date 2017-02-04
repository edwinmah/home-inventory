import fetchAuth from '../fetchAuth';
import { hashHistory } from 'react-router';


const DELETE_SINGLE_ITEM_SUCCESS = 'DELETE_SINGLE_ITEM_SUCCESS';
const deleteSingleItemSuccess = (itemId) => {
  return {
    type: DELETE_SINGLE_ITEM_SUCCESS,
    itemId: itemId
  };
};


const DELETE_SINGLE_ITEM_ERROR = 'DELETE_SINGLE_ITEM_ERROR';
const deleteSingleItemError = (itemId, error) => {
  return {
    type: DELETE_SINGLE_ITEM_ERROR,
    itemId: itemId,
    error: error
  };
};


const deleteSingleItem = (itemId) => dispatch => {
  fetchAuth('DELETE', `/item/${itemId}`)
  .then((item) => {
    return dispatch(deleteSingleItemSuccess(item._id));
  })
  .then(() => {
    hashHistory.push('/');
  })
  .catch((error) => {
    console.log(error);
    return dispatch(deleteSingleItemError(error));
  });
};


exports.DELETE_SINGLE_ITEM_SUCCESS = DELETE_SINGLE_ITEM_SUCCESS;
exports.deleteSingleItemSuccess    = deleteSingleItemSuccess;

exports.DELETE_SINGLE_ITEM_ERROR = DELETE_SINGLE_ITEM_ERROR;
exports.deleteSingleItemError    = deleteSingleItemError;

exports.deleteSingleItem  = deleteSingleItem;
