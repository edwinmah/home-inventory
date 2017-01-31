import fetchAuth from '../fetchAuth';


var FETCH_SINGLE_ITEM_SUCCESS = 'FETCH_SINGLE_ITEM_SUCCESS';
var fetchSingleItemSuccess = function(item) {
  return {
    type: FETCH_SINGLE_ITEM_SUCCESS,
    item: item
  };
};


var FETCH_SINGLE_ITEM_ERROR = 'FETCH_SINGLE_ITEM_ERROR';
var fetchSingleItemError = function(item, error) {
  return {
    type: FETCH_SINGLE_ITEM_ERROR,
    item: item,
    error: error
  };
};


var fetchSingleItem = (itemId) => dispatch => {
  fetchAuth('GET', `/item/${itemId}`)
  .then(function(data) {
    var item = data;
    return dispatch(fetchSingleItemSuccess(item));
  })
  .catch(function(error) {
    return dispatch(fetchSingleItemError(error));
  });
};


exports.FETCH_SINGLE_ITEM_SUCCESS = FETCH_SINGLE_ITEM_SUCCESS;
exports.fetchSingleItemSuccess    = fetchSingleItemSuccess;

exports.FETCH_SINGLE_ITEM_ERROR = FETCH_SINGLE_ITEM_ERROR;
exports.fetchSingleItemError    = fetchSingleItemError;

exports.fetchSingleItem  = fetchSingleItem;
