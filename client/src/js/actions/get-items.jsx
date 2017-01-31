import fetchAuth from '../fetchAuth';


const FETCH_ITEMS_SUCCESS = 'FETCH_ITEMS_SUCCESS';
const fetchItemsSuccess = (items) => {
  return {
    type: FETCH_ITEMS_SUCCESS,
    items: items
  };
};


const FETCH_ITEMS_ERROR = 'FETCH_ITEMS_ERROR';
const fetchItemsError = (items, error) => {
  return {
    type: FETCH_ITEMS_ERROR,
    items: items,
    error: error
  };
};


const fetchItems = () => dispatch => {
  fetchAuth('GET', '/items')
  .then((data) => {
    const items = data;
    return dispatch(fetchItemsSuccess(items));
  })
  .catch((error) => {
    return dispatch(fetchItemsError(error));
  });
};


exports.FETCH_ITEMS_SUCCESS  = FETCH_ITEMS_SUCCESS;
exports.fetchItemsSuccess    = fetchItemsSuccess;

exports.FETCH_ITEMS_ERROR  = FETCH_ITEMS_ERROR;
exports.fetchItemsError    = fetchItemsError;

exports.fetchItems  = fetchItems;
