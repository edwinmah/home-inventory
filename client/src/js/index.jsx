require('normalize.css/normalize.css');
require('../css/style.css');
require('babel-polyfill');
import React from 'react';
import ReactDOM from 'react-dom';
import { redux, Provider } from 'react-redux';
import { router, Router, Route, hashHistory } from 'react-router';
import store from './store';
import App from './components/App';


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={App} />
      </Router>
    </Provider>,
    document.getElementById('react-app'));
});
