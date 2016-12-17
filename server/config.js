exports.DATABASE_URL = process.env.DATABASE_URL ||
  global.DATABASE_URL ||
  (process.env.NODE_ENV === 'production' ?
   'mongodb://localhost/home-inventory' :
   'mongodb://localhost/home-inventory-dev');

exports.PORT = process.env.PORT || 8080;
