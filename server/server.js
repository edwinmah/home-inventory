import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import config from './config';
const app = express();


app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(express.static('./client/build'));


const runServer = (callback) => {
  mongoose.connect(config.DATABASE_URL, (err) => {
    if (err && callback) {
      return callback(err);
    }

    app.listen(config.PORT, () => {
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
  runServer((err) => {
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
