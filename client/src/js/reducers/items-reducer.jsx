import actions from '../actions/get-items';


const initialState = {};


const AllItems = (state, action) => {
  state = state || initialState;

  switch (action.type) {
    case actions.FETCH_ITEMS_SUCCESS :
      let newItems = {};
      action.items.forEach((item) => newItems[item._id] = item);
      return Object.assign({}, state, newItems);
      break;

    default :
      return state;
  }
};


export default AllItems;
