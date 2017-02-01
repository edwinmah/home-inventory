import fetchAuth from '../fetchAuth';
import { hashHistory } from 'react-router';
import actions from './get-categories';


var CREATE_CATEGORY_SUCCESS = 'CREATE_CATEGORY_SUCCESS';
var createCategorySuccess = function(category) {
  return {
    type: CREATE_CATEGORY_SUCCESS,
    category: category
  };
};


var CREATE_CATEGORY_ERROR = 'CREATE_CATEGORY_ERROR';
var createCategoryError = function(category, error) {
  return {
    type: CREATE_CATEGORY_ERROR,
    category: category,
    error: error
  };
};


var createCategory = (obj) => dispatch => {
  fetchAuth('POST', '/category', obj)
  .then(function(data) {
    var category = data;
    return dispatch(createCategorySuccess(category));
  })
  .then(function(data) {
    dispatch(actions.fetchCategoryNames());
    hashHistory.push(`/categories`);
    document.body.scrollTop = 0;
  })
  .catch(function(error) {
    console.log(error);
    return dispatch(createCategoryError(error));
  });
};


exports.CREATE_CATEGORY_SUCCESS = CREATE_CATEGORY_SUCCESS;
exports.createCategorySuccess   = createCategorySuccess;

exports.CREATE_CATEGORY_ERROR = CREATE_CATEGORY_ERROR;
exports.createCategoryError   = createCategoryError;

exports.createCategory  = createCategory;
