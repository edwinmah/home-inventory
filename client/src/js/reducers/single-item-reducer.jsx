import actions from '../actions/get-single-item';


const initialState = {};


const SingleItem = (state, action) => {
  state = state || initialState;

  switch (action.type) {
    case actions.FETCH_SINGLE_ITEM_SUCCESS :
      let newItems = Object.assign({}, state.items, {
        [action.currentItem._id]: action.currentItem
      });
      return Object.assign({}, state, { items: newItems });
      break;

    default :
      return state;
  }
};


export default SingleItem;
