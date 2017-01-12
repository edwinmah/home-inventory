require('normalize.css/normalize.css');
require('../css/style.css');
require('babel-polyfill');
import React from 'react';
import ReactDOM from 'react-dom';
import { redux, Provider } from 'react-redux';
import { router, Router, Route, hashHistory } from 'react-router';
import store from './store';
import App from './components/App';
import AllItems from './components/items-list';
import SingleItem from './components/single-item';
import CategoriesList from './components/categories-list';
import AcctInfo from './components/acct-info';



document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="" component={App}>
          <Route path="/" component={AllItems} />
          <Route path="/items" component={AllItems} />
          <Route path="/account" component={AcctInfo} />
          <Route path="/item/:id" component={SingleItem} />
          <Route path="/category/:id/items" component={AllItems} />
        </Route>
      </Router>
    </Provider>,
    document.getElementById('react-app'));
});
