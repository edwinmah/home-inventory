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
      console.log('1');
      return Object.assign({}, state, newCategories);
      break;

    default :
      console.log('2');
      return state;
  }
};


export default CategoryNames;
