import fetchAuth from '../fetchAuth';
import { hashHistory } from 'react-router';
import actions from './get-owners';


var EDIT_OWNER_SUCCESS = 'EDIT_OWNER_SUCCESS';
var editOwnerSuccess = function(owner) {
  return {
    type: EDIT_OWNER_SUCCESS,
    owner: owner
  };
};


var EDIT_OWNER_ERROR = 'EDIT_OWNER_ERROR';
var editOwnerError = function(owner, error) {
  return {
    type: EDIT_OWNER_ERROR,
    owner: owner,
    error: error
  };
};


var editOwner = (ownerId, obj) => dispatch => {
  fetchAuth('PUT', `/owner/${ownerId}`, obj)
  .then(function(data) {
    var owner = data;
    return dispatch(editOwnerSuccess(owner));
  })
    .then(function() {
    dispatch(actions.fetchOwners());
    hashHistory.push('/account');
    document.body.scrollTop = 0;
  })
    .catch(function(error) {
    console.log(error);
    return dispatch(editOwnerError(error));
  });
};


exports.EDIT_OWNER_SUCCESS = EDIT_OWNER_SUCCESS;
exports.editOwnerSuccess   = editOwnerSuccess;

exports.EDIT_OWNER_ERROR = EDIT_OWNER_ERROR;
exports.editOwnerError   = editOwnerError;

exports.editOwner  = editOwner;
