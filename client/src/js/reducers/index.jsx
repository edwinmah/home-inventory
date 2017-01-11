import { combineReducers } from 'redux';
import CategoryNames from './categories-reducer';
import AllItems from './items-reducer';
import SingleItem from './single-item-reducer';
import AllOwners from './owners-reducer';
import AllPolicies from './policies-reducer';


const rootReducer = combineReducers({
  categories: CategoryNames,
  items: AllItems,
  owners: AllOwners,
  policies: AllPolicies,
  currentItem: SingleItem
});


export default rootReducer;
