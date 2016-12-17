require('normalize.css/normalize.css');
require('../css/style.css');
require('babel-polyfill');
import React from 'react';
import ReactDOM from 'react-dom';


document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <h1>Hello world...</h1>,
    document.getElementById('react-app'));
});
