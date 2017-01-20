import { combineReducers } from 'redux';
import CategoryNames from './categories-reducer';
import AllItems from './items-reducer';
import AllOwners from './owners-reducer';
import AllPolicies from './policies-reducer';


const rootReducer = combineReducers({
  categories: CategoryNames,
  items: AllItems,
  owners: AllOwners,
  policies: AllPolicies
});


export default rootReducer;
