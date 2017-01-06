require('isomorphic-fetch');


const FETCH_CATEGORY_NAMES_SUCCESS = 'FETCH_CATEGORY_NAMES_SUCCESS';
const fetchCategoryNamesSuccess = (categories) => {
  return {
    type: FETCH_CATEGORY_NAMES_SUCCESS,
    categories: categories
  };
};


const FETCH_CATEGORY_NAMES_ERROR = 'FETCH_CATEGORY_NAMES_ERROR';
const fetchCategoryNamesError = (categories, error) => {
  return {
    type: FETCH_CATEGORY_NAMES_ERROR,
    categories: categories,
    error: error
  };
};


const fetchCategoryNames = (categories) => {
  return (dispatch) => {
    const init = { method: 'GET' };
    const url  = '/categories';

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
        const categories = data;
        return dispatch(fetchCategoryNamesSuccess(categories));
      })
      .catch((error) => {
        return dispatch(fetchCategoryNamesError(categories, error));
      });
  }
};


exports.FETCH_CATEGORY_NAMES_SUCCESS  = FETCH_CATEGORY_NAMES_SUCCESS;
exports.fetchCategoryNamesSuccess     = fetchCategoryNamesSuccess;

exports.FETCH_CATEGORY_NAMES_ERROR  = FETCH_CATEGORY_NAMES_ERROR;
exports.fetchCategoryNamesError     = fetchCategoryNamesError;

exports.fetchCategoryNames  = fetchCategoryNames;
