require('isomorphic-fetch');


var FETCH_SINGLE_ITEM_SUCCESS = 'FETCH_SINGLE_ITEM_SUCCESS';
var fetchSingleItemSuccess = function(item) {
  return {
    type: FETCH_SINGLE_ITEM_SUCCESS,
    currentItem: item
  };
};


var FETCH_SINGLE_ITEM_ERROR = 'FETCH_SINGLE_ITEM_ERROR';
var fetchSingleItemError = function(item, error) {
  return {
    type: FETCH_SINGLE_ITEM_ERROR,
    currentItem: item,
    error: error
  };
};


var fetchSingleItem = function(itemId) {
  return function(dispatch) {
    var init = { method: 'GET' };
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
        return dispatch(fetchSingleItemSuccess(item));
      })
      .catch(function(speech, error) {
        return dispatch(fetchSingleItemError(item, error));
      });
  }
};


exports.FETCH_SINGLE_ITEM_SUCCESS = FETCH_SINGLE_ITEM_SUCCESS;
exports.fetchSingleItemSuccess    = fetchSingleItemSuccess;

exports.FETCH_SINGLE_ITEM_ERROR = FETCH_SINGLE_ITEM_ERROR;
exports.fetchSingleItemError    = fetchSingleItemError;

exports.fetchSingleItem  = fetchSingleItem;
