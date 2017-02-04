import fetchAuth from '../fetchAuth';
import { hashHistory } from 'react-router';


const DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCCESS';
const deleteCategorySuccess = (categoryId) => {
  return {
    type: DELETE_CATEGORY_SUCCESS,
    categoryId: categoryId
  };
};


const DELETE_CATEGORY_ERROR = 'DELETE_CATEGORY_ERROR';
const deleteCategoryError = (categoryId, error) => {
  return {
    type: DELETE_CATEGORY_ERROR,
    categoryId: categoryId,
    error: error
  };
};


const deleteCategory = (categoryId) => dispatch => {
  fetchAuth('DELETE', `/category/${categoryId}`)
  .then((category) => {
    return dispatch(deleteCategorySuccess(categoryId));
  })
  .then(() => {
    hashHistory.push('/categories');
    document.body.scrollTop = 0;
  })
  .catch((error) => {
    console.log(error);
    return dispatch(deleteCategoryError(error));
  });
};


exports.DELETE_CATEGORY_SUCCESS = DELETE_CATEGORY_SUCCESS;
exports.deleteCategorySuccess   = deleteCategorySuccess;

exports.DELETE_CATEGORY_ERROR = DELETE_CATEGORY_ERROR;
exports.deleteCategoryError   = deleteCategoryError;

exports.deleteCategory  = deleteCategory;
