import fetchAuth from '../fetchAuth';


const FETCH_POLICIES_SUCCESS = 'FETCH_POLICIES_SUCCESS';
const fetchPoliciesSuccess = (policies) => {
  return {
    type: FETCH_POLICIES_SUCCESS,
    policies: policies
  };
};


const FETCH_POLICIES_ERROR = 'FETCH_POLICIES_ERROR';
const fetchPoliciesError = (policies, error) => {
  return {
    type: FETCH_POLICIES_ERROR,
    policies: policies,
    error: error
  };
};


const fetchPolicies = () => dispatch => {
  fetchAuth('GET', '/policies')
  .then((data) => {
    const policies = data;
    return dispatch(fetchPoliciesSuccess(policies));
  })
  .catch((error) => {
    return dispatch(fetchPoliciesError(error));
  });
};


exports.FETCH_POLICIES_SUCCESS  = FETCH_POLICIES_SUCCESS;
exports.fetchPoliciesSuccess    = fetchPoliciesSuccess;

exports.FETCH_POLICIES_ERROR  = FETCH_POLICIES_ERROR;
exports.fetchPoliciesError    = fetchPoliciesError;

exports.fetchPolicies  = fetchPolicies;
