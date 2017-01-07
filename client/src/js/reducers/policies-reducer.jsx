import actions from '../actions/get-policies';


const initialState = {};


const AllPolicies = (state, action) => {
  state = state || initialState;

  switch (action.type) {
    case actions.FETCH_POLICIES_SUCCESS :
      let newPolicies = {};
      action.policies.forEach((policy) => newPolicies[policy._id] = policy);
      return Object.assign({}, state, newPolicies);
      break;

    default :
      return state;
  }
};


export default AllPolicies;
