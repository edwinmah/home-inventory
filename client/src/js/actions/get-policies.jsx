require('isomorphic-fetch');


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


const fetchPolicies = (policies) => {
  return (dispatch) => {
    const init = { method: 'GET' };
    const url  = '/policies';

    return fetch(url, init).then((response) => {
      if (response.status < 200 || response.status >= 300) {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
      return response;
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const policies = data;
        return dispatch(fetchPoliciesSuccess(policies));
      })
      .catch((error) => {
        return dispatch(fetchPoliciesError(policies, error));
      });
  }
};


exports.FETCH_POLICIES_SUCCESS  = FETCH_POLICIES_SUCCESS;
exports.fetchPoliciesSuccess    = fetchPoliciesSuccess;

exports.FETCH_POLICIES_ERROR  = FETCH_POLICIES_ERROR;
exports.fetchPoliciesError    = fetchPoliciesError;

exports.fetchPolicies  = fetchPolicies;
