require('isomorphic-fetch');
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


var editOwner = function(ownerId, obj) {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  return function(dispatch) {
    var init = {
      method: 'PUT',
      body: JSON.stringify(obj),
      headers: myHeaders
    };
    var url  = '/owner/' + ownerId;

    return fetch(url, init).then(function(response) {
      if (response.status < 200 || response.status >= 300) {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
      return response;
    })
      .then(function(response) {
        return response.json();
      })
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
  }
};


exports.EDIT_OWNER_SUCCESS = EDIT_OWNER_SUCCESS;
exports.editOwnerSuccess   = editOwnerSuccess;

exports.EDIT_OWNER_ERROR = EDIT_OWNER_ERROR;
exports.editOwnerError   = editOwnerError;

exports.editOwner  = editOwner;
