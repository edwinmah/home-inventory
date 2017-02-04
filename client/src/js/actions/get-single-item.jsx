import fetchAuth from '../fetchAuth';


const FETCH_SINGLE_ITEM_SUCCESS = 'FETCH_SINGLE_ITEM_SUCCESS';
const fetchSingleItemSuccess = (item) => {
  return {
    type: FETCH_SINGLE_ITEM_SUCCESS,
    item: item
  };
};


const FETCH_SINGLE_ITEM_ERROR = 'FETCH_SINGLE_ITEM_ERROR';
const fetchSingleItemError = (item, error) => {
  return {
    type: FETCH_SINGLE_ITEM_ERROR,
    item: item,
    error: error
  };
};


const fetchSingleItem = (itemId) => dispatch => {
  fetchAuth('GET', `/item/${itemId}`)
  .then((data) => {
    var item = data;
    return dispatch(fetchSingleItemSuccess(item));
  })
  .catch((error) => {
    return dispatch(fetchSingleItemError(error));
  });
};


exports.FETCH_SINGLE_ITEM_SUCCESS = FETCH_SINGLE_ITEM_SUCCESS;
exports.fetchSingleItemSuccess    = fetchSingleItemSuccess;

exports.FETCH_SINGLE_ITEM_ERROR = FETCH_SINGLE_ITEM_ERROR;
exports.fetchSingleItemError    = fetchSingleItemError;

exports.fetchSingleItem  = fetchSingleItem;
