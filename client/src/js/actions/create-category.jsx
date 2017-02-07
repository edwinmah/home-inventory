import fetchAuth from '../fetchAuth';
import { hashHistory } from 'react-router';


const CREATE_CATEGORY_SUCCESS = 'CREATE_CATEGORY_SUCCESS';
const createCategorySuccess = (category) => {
  return {
    type: CREATE_CATEGORY_SUCCESS,
    category: category
  };
};


const CREATE_CATEGORY_ERROR = 'CREATE_CATEGORY_ERROR';
const createCategoryError = (category, error) => {
  return {
    type: CREATE_CATEGORY_ERROR,
    category: category,
    error: error
  };
};


const createCategory = (obj) => dispatch => {
  fetchAuth('POST', '/category', obj)
  .then((data) => {
    const category = data;
    return dispatch(createCategorySuccess(category));
  })
  .then((data) => {
    hashHistory.push(`/categories`);
    document.body.scrollTop = 0;
  })
  .catch((error) => {
    console.log(error);
    return dispatch(createCategoryError(error));
  });
};


exports.CREATE_CATEGORY_SUCCESS = CREATE_CATEGORY_SUCCESS;
exports.createCategorySuccess   = createCategorySuccess;

exports.CREATE_CATEGORY_ERROR = CREATE_CATEGORY_ERROR;
exports.createCategoryError   = createCategoryError;

exports.createCategory  = createCategory;
