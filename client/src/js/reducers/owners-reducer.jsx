import actions from '../actions/get-owners';
import { EDIT_OWNER_SUCCESS } from '../actions/edit-owner';


const initialState = {};


const AllOwners = (state, action) => {
  state = state || initialState;

  switch (action.type) {
    case actions.FETCH_OWNERS_SUCCESS :
      let newOwners = {};
      action.owners.forEach((owner) => newOwners[owner._id] = owner);
      return Object.assign({}, state, newOwners);
      break;

    case EDIT_OWNER_SUCCESS :
      const editedOwner = action.owner;
      return Object.assign({}, state, { [editedOwner._id]: editedOwner });
      break;

    default :
      return state;
  }
};


export default AllOwners;
