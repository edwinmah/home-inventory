import { combineReducers } from 'redux';
import CategoryNames from './category-names-reducer';
import AllItems from './items-reducer';


const rootReducer = combineReducers({
  categories: CategoryNames,
  items: AllItems
});


export default rootReducer;
