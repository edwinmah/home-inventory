import { combineReducers } from 'redux';
import CategoryNames from './category-names-reducer';


const rootReducer = combineReducers({
  categories: CategoryNames
});


export default rootReducer;
