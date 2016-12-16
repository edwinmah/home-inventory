var express    = require('express');
var bodyParser = require('body-parser');
var morgan     = require('morgan');
var mongoose   = require('mongoose');
var config     = require('./config');
var app        = express();


app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(express.static('./build'));


var runServer = function(callback) {
  mongoose.connect(config.DATABASE_URL, function(err) {
    if (err && callback) {
      return callback(err);
    }

    app.listen(config.PORT, function() {
      console.log('Listening on localhost:' + config.PORT);
      if (callback) {
        callback();
      }
    });
  });
};

/*********
 * Models
 *********/



/************
 * Endpoints
 ************/





if (require.main === module) {
  runServer(function(err) {
    if (err) {
      console.error(err);
    }
  });
};

/**********
 * Exports
 **********/
exports.app       = app;
exports.runServer = runServer;
