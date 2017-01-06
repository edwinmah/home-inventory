import actions from '../actions/get-category-names';


const initialState = [];


const CategoryNames = (state, action) => {
  state = state || initialState;

  switch (action.type) {
    case actions.FETCH_CATEGORY_NAMES_SUCCESS :
      return state.concat(action.categories);
      break;

    default :
      return state;
  }
};


export default CategoryNames;
