require('isomorphic-fetch');
import { hashHistory } from 'react-router';
import actions from './get-single-item';
import actionsSingle from '../actions/get-single-item';


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


var createItem = function(obj) {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  return function(dispatch) {
    var init = {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: myHeaders
    };
    var url  = '/item';

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
        return dispatch(createItemSuccess(item));
      })
      .then(function(data) {
        dispatch(actionsSingle.fetchSingleItem(data.item._id));
        hashHistory.push(`${url}/${data.item._id}`);
        document.body.scrollTop = 0;
      })
      .catch(function(error) {
        console.log(error);
        return dispatch(createItemError(error));
      });
  }
};


exports.CREATE_ITEM_SUCCESS = CREATE_ITEM_SUCCESS;
exports.createItemSuccess   = createItemSuccess;

exports.CREATE_ITEM_ERROR = CREATE_ITEM_ERROR;
exports.createItemError   = createItemError;

exports.createItem  = createItem;
