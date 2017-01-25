require('tachyons');
require('react-datetime/css/react-datetime.css');
require('../css/style.css');
require('babel-polyfill');
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
import store from './store';
import App from './components/App';
import AllItems from './components/items-list';
import SingleItem from './components/single-item';
import AcctInfo from './components/acct-info';
import EditItem from './components/edit-item';
import DeleteItem from './components/delete-item';



document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="" component={App}>
          <Route path="/" component={AllItems} />
          <Route path="/item/add" component={EditItem} />
          <Route path="/account" component={AcctInfo} />
          <Route path="/item/:id" component={SingleItem}>
            <Route path="/item/:id/edit" component={EditItem} />
          </Route>
          <Route path="/item/:id/delete" component={DeleteItem} />
          <Route path="/category/:id/items" component={AllItems} />
        </Route>
      </Router>
    </Provider>,
    document.getElementById('react-app'));
});
