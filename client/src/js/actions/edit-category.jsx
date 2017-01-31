import fetchAuth from '../fetchAuth';
import { hashHistory } from 'react-router';
import actions from './get-categories';


var EDIT_CATEGORY_SUCCESS = 'EDIT_CATEGORY_SUCCESS';
var editCategorySuccess = function(category) {
  return {
    type: EDIT_CATEGORY_SUCCESS,
    category: category
  };
};


var EDIT_CATEGORY_ERROR = 'EDIT_CATEGORY_ERROR';
var editCategoryError = function(category, error) {
  return {
    type: EDIT_CATEGORY_ERROR,
    category: category,
    error: error
  };
};


var editCategory = (categoryId, obj) => dispatch => {
  fetchAuth('PUT', `/category/${categoryId}`, obj)
  .then(function(data) {
    var item = data;
    return dispatch(editCategorySuccess(category));
  })
  .then(function() {
    //dispatch(actions.fetchCategoryNames());
    hashHistory.push(`/categories`);
    document.body.scrollTop = 0;
  })
  .catch(function(error) {
    console.log(error);
    return dispatch(editCategoryError(error));
  });
};


exports.EDIT_CATEGORY_SUCCESS = EDIT_CATEGORY_SUCCESS;
exports.editCategorySuccess   = editCategorySuccess;

exports.EDIT_CATEGORY_ERROR = EDIT_CATEGORY_ERROR;
exports.editCategoryError   = editCategoryError;

exports.editCategory  = editCategory;
