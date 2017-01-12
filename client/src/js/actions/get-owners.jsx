require('isomorphic-fetch');


const FETCH_OWNERS_SUCCESS = 'FETCH_OWNERS_SUCCESS';
const fetchOwnersSuccess = (owners) => {
  return {
    type: FETCH_OWNERS_SUCCESS,
    owners: owners
  };
};


const FETCH_OWNERS_ERROR = 'FETCH_OWNERS_ERROR';
const fetchOwnersError = (owners, error) => {
  return {
    type: FETCH_OWNERS_ERROR,
    owners: owners,
    error: error
  };
};


const fetchOwners = () => {
  return (dispatch) => {
    const init = { method: 'GET' };
    const url  = '/owners';

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
        const owners = data;
        return dispatch(fetchOwnersSuccess(owners));
      })
      .catch((error) => {
        return dispatch(fetchOwnersError(error));
      });
  }
};


exports.FETCH_OWNERS_SUCCESS  = FETCH_OWNERS_SUCCESS;
exports.fetchOwnersSuccess    = fetchOwnersSuccess;

exports.FETCH_OWNERS_ERROR  = FETCH_OWNERS_ERROR;
exports.fetchOwnersError    = fetchOwnersError;

exports.fetchOwners  = fetchOwners;
