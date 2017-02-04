import { FETCH_POLICIES_SUCCESS } from '../actions/get-policies';
import { EDIT_POLICY_SUCCESS } from '../actions/edit-policy';


const initialState = {};


const AllPolicies = (state, action) => {
  state = state || initialState;

  switch (action.type) {
    case FETCH_POLICIES_SUCCESS :
      let newPolicies = {};
      action.policies.forEach((policy) => newPolicies[policy._id] = policy);
      return Object.assign({}, state, newPolicies);
      break;

    case EDIT_POLICY_SUCCESS :
      const editedPolicy = action.policy;
      return Object.assign({}, state, { [editedPolicy._id]: editedPolicy });
      break;

    default :
      return state;
  }
};


export default AllPolicies;
