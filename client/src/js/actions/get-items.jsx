require('isomorphic-fetch');


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


const fetchItems = () => {
  return (dispatch) => {
    const init = { method: 'GET' };
    const url  = '/items';

    return fetch(url, init).then((response) => {
      if (response.status < 200 || response.status >= 300) {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
      return response;
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const items = data;
        return dispatch(fetchItemsSuccess(items));
      })
      .catch((error) => {
        return dispatch(fetchItemsError(error));
      });
  }
};


exports.FETCH_ITEMS_SUCCESS  = FETCH_ITEMS_SUCCESS;
exports.fetchItemsSuccess    = fetchItemsSuccess;

exports.FETCH_ITEMS_ERROR  = FETCH_ITEMS_ERROR;
exports.fetchItemsError    = fetchItemsError;

exports.fetchItems  = fetchItems;
