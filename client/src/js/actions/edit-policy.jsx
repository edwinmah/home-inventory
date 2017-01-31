import fetchAuth from '../fetchAuth';
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


var editPolicy = (policyId, obj) => dispatch => {
  fetchAuth('PUT', `/policy/${policyId}`, obj)
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
};


exports.EDIT_POLICY_SUCCESS = EDIT_POLICY_SUCCESS;
exports.editPolicySuccess   = editPolicySuccess;

exports.EDIT_POLICY_ERROR = EDIT_POLICY_ERROR;
exports.editPolicyError   = editPolicyError;

exports.editPolicy  = editPolicy;
