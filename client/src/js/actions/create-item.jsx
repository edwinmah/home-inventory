import fetchAuth from '../fetchAuth';
import { hashHistory } from 'react-router';
import { fetchSingleItem } from './get-single-item';


const CREATE_ITEM_SUCCESS = 'CREATE_ITEM_SUCCESS';
const createItemSuccess = (item) => {
  return {
    type: CREATE_ITEM_SUCCESS,
    item: item
  };
};


const CREATE_ITEM_ERROR = 'CREATE_ITEM_ERROR';
const createItemError = (item, error) => {
  return {
    type: CREATE_ITEM_ERROR,
    item: item,
    error: error
  };
};


const createItem = (obj) => dispatch => {
  fetchAuth('POST', '/item', obj)
  .then((data) => {
    const item = data;
    return dispatch(createItemSuccess(item));
  })
  .then((data) => {
    dispatch(fetchSingleItem(data.item._id));
    hashHistory.push(`/item/${data.item._id}`);
    document.body.scrollTop = 0;
  })
  .catch((error) => {
    console.log(error);
    return dispatch(createItemError(error));
  });
};


exports.CREATE_ITEM_SUCCESS = CREATE_ITEM_SUCCESS;
exports.createItemSuccess   = createItemSuccess;

exports.CREATE_ITEM_ERROR = CREATE_ITEM_ERROR;
exports.createItemError   = createItemError;

exports.createItem  = createItem;
