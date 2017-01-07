import actions from '../actions/get-owners';


const initialState = {};


const AllOwners = (state, action) => {
  state = state || initialState;

  switch (action.type) {
    case actions.FETCH_OWNERS_SUCCESS :
      let newOwners = {};
      action.owners.forEach((owner) => newOwners[owner._id] = owner);
      return Object.assign({}, state, newOwners);
      break;

    default :
      return state;
  }
};


export default AllOwners;
