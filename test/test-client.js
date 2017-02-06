import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { should } from 'chai';
import { fetchCategoryNames } from '../client/src/js/actions/get-categories';
import { fetchItems } from '../client/src/js/actions/get-items';
import { fetchSingleItem } from '../client/src/js/actions/get-single-item';
import { fetchOwners } from '../client/src/js/actions/get-owners';
import { fetchPolicies } from '../client/src/js/actions/get-policies';
import CategoryNames from '../client/src/js/reducers/categories-reducer';
import AllItems from '../client/src/js/reducers/items-reducer';
import AllOwners from '../client/src/js/reducers/owners-reducer';
import AllPolicies from '../client/src/js/reducers/policies-reducer';


/************
 * test data
 ***********/
let state;

const initialState = {};

const owners = [
  {
    "_id": "586d48582ea3d63d2dafd2df",
    "googleId": "goog789",
    "name": "Your Name",
    "accessToken": "abc123",
    "address": "Your Address",
    "city": "City",
    "state": "ST",
    "zip": "12345",
    "phone": "123-456-7890",
    "email": "yourname@email.com",
    "__v": 0
  }
];

const policies = [
  {
    "_id": "586d48582ea3d63d2dafd2e0",
    "ownerId": "586d48582ea3d63d2dafd2df",
    "company": "Insurance company name",
    "policyNumber": "Policy number",
    "coverage": 0,
    "website": "Company website",
    "phone": "Company phone number",
    "email": "Company email",
    "__v": 0
  }
];

const categories = [
  {
    "_id": "586d40b07560373ca9caa3bf",
    "ownerId": "586d48582ea3d63d2dafd2df",
    "name": "Uncategorized",
    "description": "Items that don't fit any category",
    "__v": 0
  },
  {
    "_id": "586d40b07560373ca9caa3c0",
    "ownerId": "586d48582ea3d63d2dafd2df",
    "name": "Furniture",
    "description": "Includes all household furniture",
    "__v": 0
  },
  {
    "_id": "586d40b07560373ca9caa3c1",
    "ownerId": "586d48582ea3d63d2dafd2df",
    "name": "Electronics",
    "description": "Includes TVs, stereo, etc.",
    "__v": 0
  },
  {
    "_id": "586d40b07560373ca9caa3c2",
    "ownerId": "586d48582ea3d63d2dafd2df",
    "name": "Clothing",
    "description": "",
    "__v": 0
  },
  {
    "_id": "586d40b07560373ca9caa3c3",
    "ownerId": "586d48582ea3d63d2dafd2df",
    "name": "Linens",
    "description": "Includes sheets, towels, blankets, etc.",
    "__v": 0
  },
  {
    "_id": "586d40b07560373ca9caa3c4",
    "ownerId": "586d48582ea3d63d2dafd2df",
    "name": "Bathroom",
    "description": "Includes any bathroom items, etc.",
    "__v": 0
  },
  {
    "_id": "586d40b07560373ca9caa3c5",
    "ownerId": "586d48582ea3d63d2dafd2df",
    "name": "Books and media",
    "description": "Includes books, CDs, DVDs, etc.",
    "__v": 0
  },
  {
    "_id": "586d40b07560373ca9caa3c6",
    "ownerId": "586d48582ea3d63d2dafd2df",
    "name": "Artwork",
    "description": "Includes paintings, photos, sculptures, etc.",
    "__v": 0
  },
  {
    "_id": "586d40b07560373ca9caa3c7",
    "ownerId": "586d48582ea3d63d2dafd2df",
    "name": "Plants",
    "description": "",
    "__v": 0
  }
];

const items = [
  {
    "_id": "58713c8da1e12902ea3cf843",
    "ownerId": "586d48582ea3d63d2dafd2df",
    "categoryId": "586d40b07560373ca9caa3c1",
    "name": "Epson laser printer",
    "serialNumber": "EPL982-84392",
    "notes": "Nulla vitae elit libero, a pharetra augue.",
    "replaceValue": 90,
    "purchaseDate": "2014-04-01T00:00:00.000Z",
    "placePurchased": "Amazon",
    "receipt": "https://aws.com?391301.png",
    "image": "https://aws.com?3918319.png",
    "__v": 0
  },
  {
    "_id": "58713c8da1e12902ea3cf844",
    "ownerId": "586d48582ea3d63d2dafd2df",
    "categoryId": "586d40b07560373ca9caa3c0",
    "name": "Leather recliner",
    "serialNumber": "none",
    "notes": "",
    "replaceValue": 1800,
    "purchaseDate": "2004-09-30T00:00:00.000Z",
    "placePurchased": "Pottery Barn",
    "receipt": "https://aws.com?3901994.png",
    "image": "https://aws.com?3918319.png",
    "__v": 0
  },
  {
    "_id": "58713c8da1e12902ea3cf845",
    "ownerId": "586d48582ea3d63d2dafd2df",
    "categoryId": "586d40b07560373ca9caa3c0",
    "name": "Computer table",
    "serialNumber": "",
    "notes": "Maecenas faucibus mollis interdum.",
    "replaceValue": 300,
    "purchaseDate": "2007-07-14T00:00:00.000Z",
    "placePurchased": "IKEA",
    "receipt": "https://aws.com?3920109.png",
    "image": "https://aws.com?3014928.png",
    "__v": 0
  },
  {
    "_id": "58713c8da1e12902ea3cf846",
    "ownerId": "586d48582ea3d63d2dafd2df",
    "categoryId": "586d40b07560373ca9caa3c1",
    "name": "Epson flatbed scanner",
    "serialNumber": "EPSC1893-39183",
    "notes": "Sed posuere consectetur est at lobortis.",
    "replaceValue": 60,
    "purchaseDate": "2008-02-28T00:00:00.000Z",
    "placePurchased": "Amazon",
    "receipt": "https://aws.com?3810913.png",
    "image": "https://aws.com?5837282.png",
    "__v": 0
  },
  {
    "_id": "58713c8da1e12902ea3cf847",
    "ownerId": "586d48582ea3d63d2dafd2df",
    "categoryId": "586d40b07560373ca9caa3c2",
    "name": "Blue Jeans",
    "serialNumber": "",
    "notes": "Ipsum Pellentesque Magna.",
    "replaceValue": 170,
    "purchaseDate": "2015-11-28T00:00:00.000Z",
    "placePurchased": "Banana Republic",
    "receipt": "https://aws.com?3812843.png",
    "image": "https://aws.com?9817282.png",
    "__v": 0
  },
  {
    "_id": "58713c8da1e12902ea3cf848",
    "ownerId": "586d48582ea3d63d2dafd2df",
    "categoryId": "586d40b07560373ca9caa3c3",
    "name": "Queen-size Bed Comfortor",
    "serialNumber": "",
    "notes": "Aenean lacinia bibendum nulla sed consectetur.",
    "replaceValue": 110,
    "purchaseDate": "2015-11-28T00:00:00.000Z",
    "placePurchased": "Target",
    "receipt": "https://aws.com?1332813.png",
    "image": "https://aws.com?1384722.png",
    "__v": 0
  },
  {
    "_id": "58713c8da1e12902ea3cf849",
    "ownerId": "586d48582ea3d63d2dafd2df",
    "categoryId": "586d40b07560373ca9caa3c0",
    "name": "Book shelf",
    "serialNumber": "",
    "notes": "",
    "replaceValue": 90,
    "purchaseDate": "2008-10-12T00:00:00.000Z",
    "placePurchased": "Target",
    "receipt": "https://aws.com?23u4u2384u.png",
    "image": "https://aws.com?2309852091.png",
    "__v": 0
  },
  {
    "_id": "58713c8da1e12902ea3cf84a",
    "ownerId": "586d48582ea3d63d2dafd2df",
    "categoryId": "586d40b07560373ca9caa3c2",
    "name": "Khaki Pants",
    "serialNumber": "",
    "notes": "4 pairs",
    "replaceValue": 180,
    "purchaseDate": "2014-09-15T04:00:00.000Z",
    "placePurchased": "Banana Republic",
    "receipt": "https://aws.com?1239843.png",
    "image": "https://aws.com?4716422.png",
    "__v": 0
  }
];

let itemsList, categoriesList, ownersList, policiesList;

/*****************************
 * actions and reducers tests
 ****************************/
describe('The action', () => {

  it('FETCH_ITEMS_SUCCESS can get items.', () => {
    fetchItems();

    const action = {
      type: 'FETCH_ITEMS_SUCCESS',
      items: items
    };
    const newState = AllItems(state, action);
    const itemIds  = Object.keys(newState);
    itemsList = newState;

    // assertions
    newState.should.be.an('object');
    itemIds.length.should.equal(8);

    itemIds.forEach((itemId) => {
      newState[itemId]._id.should.equal(itemId);
      newState[itemId].ownerId.should.equal('586d48582ea3d63d2dafd2df');
    })

    newState[itemIds[0]].categoryId.should.equal('586d40b07560373ca9caa3c1');
    newState[itemIds[0]].name.should.equal('Epson laser printer');
    newState[itemIds[1]].categoryId.should.equal('586d40b07560373ca9caa3c0');
    newState[itemIds[1]].name.should.equal('Leather recliner');
  });


  it('FETCH_SINGLE_ITEM_SUCCESS can retrieve a single item.', () => {
    state = itemsList;

    const item = itemsList['58713c8da1e12902ea3cf843'];
    const action = {
      type: 'FETCH_SINGLE_ITEM_SUCCESS',
      item: item
    };

    const newState = AllItems(state, action);
    const selectedItem = newState[item._id];

    newState.should.be.an('object');
    selectedItem._id.should.equal('58713c8da1e12902ea3cf843');
    selectedItem.ownerId.should.equal('586d48582ea3d63d2dafd2df');
    selectedItem.categoryId.should.equal('586d40b07560373ca9caa3c1');
    selectedItem.name.should.equal('Epson laser printer');
    selectedItem.replaceValue.should.equal(90);
  });


  it('FETCH_CATEGORY_NAMES_SUCCESS can get categories.', () => {
    state = initialState;

    fetchCategoryNames();

    const action = {
      type: 'FETCH_CATEGORY_NAMES_SUCCESS',
      categories: categories
    };
    const newState    = CategoryNames(state, action);
    const categoryIds = Object.keys(newState);

    // assertions
    newState.should.be.an('object');
    categoryIds.length.should.equal(9);

    categoryIds.forEach((categoryId) => {
      newState[categoryId]._id.should.equal(categoryId);
      newState[categoryId].ownerId.should.equal('586d48582ea3d63d2dafd2df');
    })

    newState[categoryIds[0]].name.should.equal('Uncategorized');
    newState[categoryIds[1]].name.should.equal('Furniture');
    newState[categoryIds[2]].name.should.equal('Electronics');
    newState[categoryIds[3]].name.should.equal('Clothing');
    newState[categoryIds[4]].name.should.equal('Linens');
    newState[categoryIds[5]].name.should.equal('Bathroom');
    newState[categoryIds[6]].name.should.equal('Books and media');
    newState[categoryIds[7]].name.should.equal('Artwork');
    newState[categoryIds[8]].name.should.equal('Plants');
  });


  it('FETCH_OWNERS_SUCCESS can get owners.', () => {
    state = initialState;

    fetchOwners();

    const action = {
      type: 'FETCH_OWNERS_SUCCESS',
      owners: owners
    };
    const newState = AllOwners(state, action);
    const ownerIds = Object.keys(newState);
    const owner = newState[ownerIds[0]];

    // assertions
    newState.should.be.an('object');
    ownerIds.length.should.equal(1);
    owner._id.should.equal('586d48582ea3d63d2dafd2df');
    owner.googleId.should.equal('goog789');
    owner.name.should.equal('Your Name');
    owner.accessToken.should.equal('abc123');
    owner.address.should.equal('Your Address');
    owner.city.should.equal('City');
    owner.state.should.equal('ST');
    owner.zip.should.equal('12345');
    owner.phone.should.equal('123-456-7890');
    owner.email.should.equal('yourname@email.com');
  });


  it('FETCH_POLICIES_SUCCESS can get policies.', () => {
    state = initialState;

    fetchPolicies();

    const action = {
      type: 'FETCH_POLICIES_SUCCESS',
      policies: policies
    };
    const newState  = AllPolicies(state, action);
    const policyIds = Object.keys(newState);
    const policy = newState[policyIds[0]];

    // assertions
    newState.should.be.an('object');
    policyIds.length.should.equal(1);
    policy._id.should.equal('586d48582ea3d63d2dafd2e0');
    policy.ownerId.should.equal('586d48582ea3d63d2dafd2df');
    policy.company.should.equal('Insurance company name');
    policy.policyNumber.should.equal('Policy number');
    policy.coverage.should.equal(0);
    policy.website.should.equal('Company website');
    policy.phone.should.equal('Company phone number');
    policy.email.should.equal('Company email');
  });


  it('EDIT_ITEM_SUCCESS can edit an item.', () => {
    state = itemsList;

    let item = itemsList['58713c8da1e12902ea3cf843'];
        item.notes = 'includes power cord and USB cable';
    const action = {
      type: 'EDIT_ITEM_SUCCESS',
      item: item
    };

    const newState = AllItems(state, action);
    const editedItem = newState['58713c8da1e12902ea3cf843'];

    newState.should.be.an('object');
    editedItem._id.should.equal('58713c8da1e12902ea3cf843');
    editedItem.ownerId.should.equal('586d48582ea3d63d2dafd2df');
    editedItem.notes.should.equal('includes power cord and USB cable');
  });




});
