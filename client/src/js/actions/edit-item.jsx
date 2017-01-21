require('isomorphic-fetch');
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


var editItem = function(itemId, obj) {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  return function(dispatch) {
    var init = {
      method: 'PUT',
      body: JSON.stringify(obj),
      headers: myHeaders
    };
    var url  = '/item/' + itemId;

    return fetch(url, init).then(function(response) {
      if (response.status < 200 || response.status >= 300) {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
      return response;
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        var item = data;
        return dispatch(editItemSuccess(item));
      })
      .then(function() {
        hashHistory.push(url);
      })
      .catch(function(error) {
        console.log(error);
        return dispatch(editItemError(error));
      });
  }
};


exports.EDIT_ITEM_SUCCESS = EDIT_ITEM_SUCCESS;
exports.editItemSuccess   = editItemSuccess;

exports.EDIT_ITEM_ERROR = EDIT_ITEM_ERROR;
exports.editItemError   = editItemError;

exports.editItem  = editItem;
