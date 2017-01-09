import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { should } from 'chai';
import actionsCat from '../client/src/js/actions/get-categories';
import actionsItems from '../client/src/js/actions/get-items';
import actionsOwners from '../client/src/js/actions/get-owners';
import actionsPolicies from '../client/src/js/actions/get-policies';
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
    "name": "Your Name",
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
    "name": "Uncategorized",
    "description": "Items that don't fit any category",
    "__v": 0
  },
  {
    "_id": "586d40b07560373ca9caa3c0",
    "name": "Furniture",
    "description": "Includes all household furniture",
    "__v": 0
  },
  {
    "_id": "586d40b07560373ca9caa3c1",
    "name": "Electronics",
    "description": "Includes TVs, stereo, etc.",
    "__v": 0
  },
  {
    "_id": "586d40b07560373ca9caa3c2",
    "name": "Clothing",
    "description": "",
    "__v": 0
  },
  {
    "_id": "586d40b07560373ca9caa3c3",
    "name": "Linens",
    "description": "Includes sheets, towels, blankets, etc.",
    "__v": 0
  },
  {
    "_id": "586d40b07560373ca9caa3c4",
    "name": "Bathroom",
    "description": "Includes any bathroom items, etc.",
    "__v": 0
  },
  {
    "_id": "586d40b07560373ca9caa3c5",
    "name": "Books and media",
    "description": "Includes books, CDs, DVDs, etc.",
    "__v": 0
  },
  {
    "_id": "586d40b07560373ca9caa3c6",
    "name": "Artwork",
    "description": "Includes paintings, photos, sculptures, etc.",
    "__v": 0
  },
  {
    "_id": "586d40b07560373ca9caa3c7",
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

/*****************************
 * actions and reducers tests
 ****************************/
describe('The action', () => {

  it('FETCH_ITEMS_SUCCESS can get items.', () => {
    actionsItems.fetchItems(items);

    const action = {
      type: 'FETCH_ITEMS_SUCCESS',
      items: items
    };
    const newState = AllItems(state, action);
    const itemIds  = Object.keys(newState);

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


  it('FETCH_CATEGORY_NAMES_SUCCESS can get categories.', () => {
    state = initialState;

    actionsCat.fetchCategoryNames(categories);

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

    actionsOwners.fetchOwners(owners);

    const action = {
      type: 'FETCH_OWNERS_SUCCESS',
      owners: owners
    };
    const newState = AllOwners(state, action);
    const ownerIds = Object.keys(newState);

    // assertions
    newState.should.be.an('object');
    ownerIds.length.should.equal(1);
    newState[ownerIds[0]]._id.should.equal('586d48582ea3d63d2dafd2df');
    newState[ownerIds[0]].name.should.equal('Your Name');
    newState[ownerIds[0]].address.should.equal('Your Address');
    newState[ownerIds[0]].city.should.equal('City');
    newState[ownerIds[0]].state.should.equal('ST');
    newState[ownerIds[0]].zip.should.equal('12345');
    newState[ownerIds[0]].phone.should.equal('123-456-7890');
    newState[ownerIds[0]].email.should.equal('yourname@email.com');
  });


  it('FETCH_POLICIES_SUCCESS can get owners.', () => {
    state = initialState;

    actionsPolicies.fetchPolicies(policies);

    const action = {
      type: 'FETCH_POLICIES_SUCCESS',
      policies: policies
    };
    const newState  = AllPolicies(state, action);
    const policyIds = Object.keys(newState);

    // assertions
    newState.should.be.an('object');
    policyIds.length.should.equal(1);
    newState[policyIds[0]]._id.should.equal('586d48582ea3d63d2dafd2e0');
    newState[policyIds[0]].ownerId.should.equal('586d48582ea3d63d2dafd2df');
    newState[policyIds[0]].company.should.equal('Insurance company name');
    newState[policyIds[0]].policyNumber.should.equal('Policy number');
    newState[policyIds[0]].coverage.should.equal(0);
    newState[policyIds[0]].website.should.equal('Company website');
    newState[policyIds[0]].phone.should.equal('Company phone number');
    newState[policyIds[0]].email.should.equal('Company email');
  });

});
