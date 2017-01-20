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

    case actions.FETCH_SINGLE_ITEM_SUCCESS :
      const item = action.item;
      return Object.assign({}, state, { [item._id]: item });
      break;

    case actions.EDIT_ITEM_SUCCESS :
      const editedItem = action.item;
      return Object.assign({}, state, { [editedItem._id]: editedItem });
      break;

    default :
      return state;
  }
};


export default AllItems;
