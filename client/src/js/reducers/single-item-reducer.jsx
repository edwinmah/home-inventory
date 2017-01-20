import actions from '../actions/get-single-item';


const initialState = {};


const SingleItem = (state, action) => {
  state = state || initialState;

  switch (action.type) {
    case actions.FETCH_SINGLE_ITEM_SUCCESS :
      return Object.assign({}, state, action.currentItem);
      break;

    default :
      return state;
  }
};


export default SingleItem;
