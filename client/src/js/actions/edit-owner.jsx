import fetchAuth from '../fetchAuth';
import { hashHistory } from 'react-router';
import { fetchOwners } from './get-owners';


const EDIT_OWNER_SUCCESS = 'EDIT_OWNER_SUCCESS';
const editOwnerSuccess = (owner) => {
  return {
    type: EDIT_OWNER_SUCCESS,
    owner: owner
  };
};


const EDIT_OWNER_ERROR = 'EDIT_OWNER_ERROR';
const editOwnerError = (owner, error) => {
  return {
    type: EDIT_OWNER_ERROR,
    owner: owner,
    error: error
  };
};


const editOwner = (ownerId, obj) => dispatch => {
  fetchAuth('PUT', `/owner/${ownerId}`, obj)
  .then((data) => {
    const owner = data;
    return dispatch(editOwnerSuccess(owner));
  })
    .then(() => {
    dispatch(fetchOwners());
    hashHistory.push('/account');
    document.body.scrollTop = 0;
  })
    .catch((error) => {
    console.log(error);
    return dispatch(editOwnerError(error));
  });
};


exports.EDIT_OWNER_SUCCESS = EDIT_OWNER_SUCCESS;
exports.editOwnerSuccess   = editOwnerSuccess;

exports.EDIT_OWNER_ERROR = EDIT_OWNER_ERROR;
exports.editOwnerError   = editOwnerError;

exports.editOwner  = editOwner;
