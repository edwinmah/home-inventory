import fetchAuth from '../fetchAuth';
import { hashHistory } from 'react-router';


var DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCCESS';
var deleteCategorySuccess = function(categoryId) {
  return {
    type: DELETE_CATEGORY_SUCCESS,
    categoryId: categoryId
  };
};


var DELETE_CATEGORY_ERROR = 'DELETE_CATEGORY_ERROR';
var deleteCategoryError = function(categoryId, error) {
  return {
    type: DELETE_CATEGORY_ERROR,
    categoryId: categoryId,
    error: error
  };
};


var deleteCategory = (categoryId) => dispatch => {
  fetchAuth('DELETE', `/category/${categoryId}`)
  .then(function(category) {
    return dispatch(deleteCategorySuccess(categoryId));
  })
  .then(function() {
    hashHistory.push('/categories');
    document.body.scrollTop = 0;
  })
  .catch(function(error) {
    console.log(error);
    return dispatch(deleteCategoryError(error));
  });
};


exports.DELETE_CATEGORY_SUCCESS = DELETE_CATEGORY_SUCCESS;
exports.deleteCategorySuccess   = deleteCategorySuccess;

exports.DELETE_CATEGORY_ERROR = DELETE_CATEGORY_ERROR;
exports.deleteCategoryError   = deleteCategoryError;

exports.deleteCategory  = deleteCategory;
