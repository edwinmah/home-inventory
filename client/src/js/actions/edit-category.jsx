import fetchAuth from '../fetchAuth';
import { hashHistory } from 'react-router';
import { fetchCategoryNames } from './get-categories';


const EDIT_CATEGORY_SUCCESS = 'EDIT_CATEGORY_SUCCESS';
const editCategorySuccess = (category) => {
  return {
    type: EDIT_CATEGORY_SUCCESS,
    category: category
  };
};


const EDIT_CATEGORY_ERROR = 'EDIT_CATEGORY_ERROR';
const editCategoryError = (category, error) => {
  return {
    type: EDIT_CATEGORY_ERROR,
    category: category,
    error: error
  };
};


const editCategory = (categoryId, obj) => dispatch => {
  fetchAuth('PUT', `/category/${categoryId}`, obj)
  .then((data) => {
    const category = data;
    return dispatch(editCategorySuccess(category));
  })
  .then(() => {
    dispatch(fetchCategoryNames());
    hashHistory.push(`/categories`);
    document.body.scrollTop = 0;
  })
  .catch((error) => {
    console.log(error);
    return dispatch(editCategoryError(error));
  });
};


exports.EDIT_CATEGORY_SUCCESS = EDIT_CATEGORY_SUCCESS;
exports.editCategorySuccess   = editCategorySuccess;

exports.EDIT_CATEGORY_ERROR = EDIT_CATEGORY_ERROR;
exports.editCategoryError   = editCategoryError;

exports.editCategory  = editCategory;
