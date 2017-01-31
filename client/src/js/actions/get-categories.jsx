import fetchAuth from '../fetchAuth';


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


const fetchCategoryNames = () => dispatch => {
  fetchAuth('GET', '/categories')
  .then((data) => {
    const categories = data;
    return dispatch(fetchCategoryNamesSuccess(categories));
  })
  .catch((error) => {
    return dispatch(fetchCategoryNamesError(error));
  });
};


exports.FETCH_CATEGORY_NAMES_SUCCESS  = FETCH_CATEGORY_NAMES_SUCCESS;
exports.fetchCategoryNamesSuccess     = fetchCategoryNamesSuccess;

exports.FETCH_CATEGORY_NAMES_ERROR  = FETCH_CATEGORY_NAMES_ERROR;
exports.fetchCategoryNamesError     = fetchCategoryNamesError;

exports.fetchCategoryNames  = fetchCategoryNames;
