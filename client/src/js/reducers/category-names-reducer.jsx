import actions from '../actions/get-category-names';


const initialState = {};


const CategoryNames = (state, action) => {
  state = state || initialState;

  switch (action.type) {
    case actions.FETCH_CATEGORY_NAMES_SUCCESS :
      let newCategories = {};
      action.categories.forEach((category) => {
        newCategories[category._id] = category;
      });
      return Object.assign({}, state, newCategories);
      break;

    default :
      return state;
  }
};


export default CategoryNames;
