import fetchAuth from '../fetchAuth';
import { hashHistory } from 'react-router';
import actions from './get-policies';


const EDIT_POLICY_SUCCESS = 'EDIT_POLICY_SUCCESS';
const editPolicySuccess = (policy) => {
  return {
    type: EDIT_POLICY_SUCCESS,
    policy: policy
  };
};


const EDIT_POLICY_ERROR = 'EDIT_POLICY_ERROR';
const editPolicyError = (policy, error) => {
  return {
    type: EDIT_POLICY_ERROR,
    policy: policy,
    error: error
  };
};


const editPolicy = (policyId, obj) => dispatch => {
  fetchAuth('PUT', `/policy/${policyId}`, obj)
  .then((data) => {
    const policy = data;
    return dispatch(editPolicySuccess(policy));
  })
  .then(() => {
    dispatch(actions.fetchPolicies());
    hashHistory.push('/account');
    document.body.scrollTop = 0;
  })
  .catch((error) => {
    console.log(error);
    return dispatch(editPolicyError(error));
  });
};


exports.EDIT_POLICY_SUCCESS = EDIT_POLICY_SUCCESS;
exports.editPolicySuccess   = editPolicySuccess;

exports.EDIT_POLICY_ERROR = EDIT_POLICY_ERROR;
exports.editPolicyError   = editPolicyError;

exports.editPolicy  = editPolicy;
