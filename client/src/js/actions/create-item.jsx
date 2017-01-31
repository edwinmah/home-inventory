import fetchAuth from '../fetchAuth';
import { hashHistory } from 'react-router';
import actions from './get-single-item';


var CREATE_ITEM_SUCCESS = 'CREATE_ITEM_SUCCESS';
var createItemSuccess = function(item) {
  return {
    type: CREATE_ITEM_SUCCESS,
    item: item
  };
};


var CREATE_ITEM_ERROR = 'CREATE_ITEM_ERROR';
var createItemError = function(item, error) {
  return {
    type: CREATE_ITEM_ERROR,
    item: item,
    error: error
  };
};


var createItem = (obj) => dispatch => {
  fetchAuth('POST', '/item', obj)
  .then(function(data) {
    var item = data;
    return dispatch(createItemSuccess(item));
  })
  .then(function(data) {
    dispatch(actions.fetchSingleItem(data.item._id));
    hashHistory.push(`${url}/${data.item._id}`);
    document.body.scrollTop = 0;
  })
  .catch(function(error) {
    console.log(error);
    return dispatch(createItemError(error));
  });
};


exports.CREATE_ITEM_SUCCESS = CREATE_ITEM_SUCCESS;
exports.createItemSuccess   = createItemSuccess;

exports.CREATE_ITEM_ERROR = CREATE_ITEM_ERROR;
exports.createItemError   = createItemError;

exports.createItem  = createItem;
