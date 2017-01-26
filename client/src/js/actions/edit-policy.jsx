require('isomorphic-fetch');
import { hashHistory } from 'react-router';
import actions from './get-policies';


var EDIT_POLICY_SUCCESS = 'EDIT_POLICY_SUCCESS';
var editPolicySuccess = function(policy) {
  return {
    type: EDIT_POLICY_SUCCESS,
    policy: policy
  };
};


var EDIT_POLICY_ERROR = 'EDIT_POLICY_ERROR';
var editPolicyError = function(policy, error) {
  return {
    type: EDIT_POLICY_ERROR,
    policy: policy,
    error: error
  };
};


var editPolicy = function(policyId, obj) {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  return function(dispatch) {
    var init = {
      method: 'PUT',
      body: JSON.stringify(obj),
      headers: myHeaders
    };
    var url  = '/policy/' + policyId;

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
      var policy = data;
        return dispatch(editPolicySuccess(policy));
      })
      .then(function() {
        dispatch(actions.fetchPolicies());
        hashHistory.push('/account');
        document.body.scrollTop = 0;
      })
      .catch(function(error) {
        console.log(error);
        return dispatch(editPolicyError(error));
      });
  }
};


exports.EDIT_POLICY_SUCCESS = EDIT_POLICY_SUCCESS;
exports.editPolicySuccess   = editPolicySuccess;

exports.EDIT_POLICY_ERROR = EDIT_POLICY_ERROR;
exports.editPolicyError   = editPolicyError;

exports.editPolicy  = editPolicy;
