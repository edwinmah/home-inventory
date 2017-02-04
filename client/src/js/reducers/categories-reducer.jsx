import { FETCH_CATEGORY_NAMES_SUCCESS } from '../actions/get-categories';
import { EDIT_CATEGORY_SUCCESS } from '../actions/edit-category';
import { DELETE_CATEGORY_SUCCESS } from '../actions/delete-category';


const initialState = {};


const CategoryNames = (state, action) => {
  state = state || initialState;

  switch (action.type) {
    case FETCH_CATEGORY_NAMES_SUCCESS :
      let newCategories = {};
      action.categories.forEach((category) => newCategories[category._id] = category);
      return Object.assign({}, state, newCategories);
      break;

    case EDIT_CATEGORY_SUCCESS :
      const editedCategory = action.category;
      return Object.assign({}, state, { [editedCategory._id]: editedCategory });
      break;

    case DELETE_CATEGORY_SUCCESS :
      const deletedCategory = action.categoryId;
      const newState = Object.assign({}, state);
      delete newState[deletedCategory];
      return newState;
      break;

    default :
      return state;
  }
};


export default CategoryNames;
