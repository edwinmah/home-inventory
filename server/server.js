/***************
 * Dependencies
 **************/
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import config from './config';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
const app = express();
const auth = passport.authenticate('bearer', { session: false });


/**************
 * Data Models
 *************/
import Owner from './models/owner';
import Policy from './models/policy';
import Category from './models/category';
import Item from './models/item';


/*************
 * Middleware
 ************/
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(express.static('./client/build'));
app.use('/s3', require('react-dropzone-s3-uploader/s3router')({
  bucket: "homeinventorybucket",
  region: 'us-east-1',
  headers: {'Access-Control-Allow-Origin': '*'},
  ACL: 'public-read'
}));
app.use(passport.initialize());


/*****************
 * Authentication
 ****************/
passport.serializeUser(function(owner, done) {
  var query = { _id: owner._id };
  Owner.update(query, owner, done);
});

passport.deserializeUser(function(obj, done) {
  Owner.findOne({ _id: obj._id}, (err, owner) => {
    done(null, owner);
  });
});


passport.use(new GoogleStrategy({
  clientID: config.GOOGLE_CLIENT_ID,
  clientSecret: config.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:8080/auth/google/callback"
},
  function(accessToken, refreshToken, profile, cb) {
    Owner.findOne({ googleId: profile.id })
      .then(function(owner) {
        if (!owner) {
          let newOwner;
          return Owner.create({
            googleId: profile.id,
            name: profile.displayName,
            accessToken: accessToken,
            address: 'Address',
            city: 'City',
            state: 'State',
            zip: '12345',
            phone: '456-789-0123',
            email: 'yourname@email.com'
          })
          .then(function(owner) {
            newOwner = owner;
            return Policy.create({
              ownerId: owner._id,
              company: 'Insurance company name',
              policyNumber: 'Policy number',
              coverage: 0,
              website: 'https://www.insurancecompany.com',
              phone: '123-456-7890',
              email: 'email@insurancecompany.com'
            })
          })
          .then(function(policy) {
            cb(null, newOwner);
            return Category.create({
              ownerId: newOwner._id,
              name: 'Uncategorized',
              description: 'Items that don\'t fit any category'
            })
          })
        }
        return cb(null, owner);
      })
      .catch(function(err, owner) {
        return cb(err, owner);
      })
  }
));

passport.use(
  new BearerStrategy(
    function(accessToken, done) {
      Owner.findOne({ accessToken: accessToken },
                    function (err, owner) {
        if (err) {
          console.log("error");
          return done(err);
        }
        else if (!owner) {
          console.log("owner not found");
          return done(null, false);
        } else {
          return done(null, owner, { scope: 'read' });
        }
      });
    }
));


app.get('/auth/google',
        passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/login' }),
        function(req, res) {
  // Successful authentication, redirect home.
  res.cookie('accessToken', req.user.accessToken, {expires: 0});
  res.redirect('/');
});


/**********
 * Connect
 *********/
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


/****************
 * GET Endpoints
 ***************/
// GET all owners
app.get('/owners', auth, (req, res) => {
  let query = { _id: req.user._id };
  Owner.find(query, (err, owners) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        message: 'Bad Request'
      });
    }
    res.json(owners);
  });
});

// GET all policies
app.get('/policies', auth, (req, res) => {
  let query = { ownerId: req.user._id };
  Policy.find(query, (err, policies) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        message: 'Bad Request'
      });
    }
    res.json(policies);
  });
});

// GET a single policy
app.get('/policy/:id', (req, res) => {
  let query = { _id: req.params.id };
  Policy.findOne(query, (err, policy) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        message: 'Bad Request'
      });
    }
    res.status(200).json(policy);
  });
});

// GET all items
app.get('/items', auth, (req, res) => {
  let query = { ownerId: req.user._id };
  Item.find(query, (err, items) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        message: 'Bad Request'
      });
    }
    res.json(items);
  });
});

// GET a single item
app.get('/item/:id', (req, res) => {
  let query  = { _id: req.params.id };
  Item.findOne(query, (err, item) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        message: 'Bad Request'
      });
    }
    res.status(200).json(item);
  });
});

// GET all categories
app.get('/categories', auth, (req, res) => {
  let query = { ownerId: req.user._id };
  Category.find(query, (err, categories) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        message: 'Bad Request'
      });
    }
    res.json(categories);
  });
});

// GET items for a single category
app.get('/category/:id/items', (req, res) => {
  let query = { _id: req.params.id }
  Category.findOne(query, (err, category) => {
    if (err) {
      return res.status(400).json({
        message: 'Bad Request'
      });
    }

    if (!category) {
      return res.status(404).json({
        message: 'Category does not exist.'
      });
    }

    let queryCategoryItems = { categoryId: query._id };
    Item.find(queryCategoryItems, (err, categoryItems) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          message: 'Bad Request'
        });
      }
      res.status(200).json(categoryItems);
    });
  });
});


/*****************
 * POST Endpoints
 ****************/
// POST a single owner
app.post('/owner', (req, res) => {
  let query = {
    name    : req.body.name,
    address : req.body.address,
    city    : req.body.city,
    state   : req.body.state,
    zip     : req.body.zip,
    phone   : req.body.phone,
    email   : req.body.email
  };

  Owner.create(query, (err, owner) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        message: 'Bad Request'
      });
    }
    res.status(201).json(owner);
  });
});

// POST a single policy
app.post('/policy', (req, res) => {
  let query = {
    ownerId      : req.body.ownerId,
    company      : req.body.company,
    policyNumber : req.body.policyNumber,
    coverage     : req.body.coverage,
    website      : req.body.website,
    phone        : req.body.phone,
    email        : req.body.email
  };

  Policy.create(query, (err, policy) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        message: 'Bad Request'
      });
    }
    res.status(201).json(policy);
  });
});

// POST a single item
app.post('/item', (req, res) => {
  let query = {
    ownerId         : req.body.ownerId,
    categoryId      : req.body.categoryId,
    name            : req.body.name,
    serialNumber    : req.body.serialNumber,
    notes           : req.body.notes,
    replaceValue    : req.body.replaceValue,
    purchaseDate    : req.body.purchaseDate,
    placePurchased  : req.body.placePurchased,
    receipt         : req.body.receipt,
    image           : req.body.image
  };

  Item.create(query, (err, item) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        message: 'Bad Request'
      });
    }
    res.status(201).json(item);
  });
});

// POST a single category
app.post('/category', (req, res) => {
  let query = {
    name        : req.body.name,
    description : req.body.description
  };

  Category.create(query, (err, category) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        message: 'Bad Request'
      });
    }
    res.status(201).json(category);
  });
});


/****************
 * PUT Endpoints
 ***************/
// PUT a single owner
app.put('/owner/:id', (req, res) => {
  let query  = { _id : req.params.id }
  let update = {
    $set: {
      name    : req.body.name,
      address : req.body.address,
      city    : req.body.city,
      state   : req.body.state,
      zip     : req.body.zip,
      phone   : req.body.phone,
      email   : req.body.email
    }
  };

  Owner.findOneAndUpdate(query, update, (err, owner) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        message: 'Bad Request'
      });
    }
    res.status(200).json(owner);
  });
});

// PUT a single policy
app.put('/policy/:id', (req, res) => {
  let query  = { _id : req.params.id }
  let update = {
    $set: {
      ownerId      : req.body.ownerId,
      company      : req.body.company,
      policyNumber : req.body.policyNumber,
      coverage     : req.body.coverage,
      website      : req.body.website,
      phone        : req.body.phone,
      email        : req.body.email
    }
  };

  Policy.findOneAndUpdate(query, update, (err, policy) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        message: 'Bad Request'
      });
    }
    res.status(200).json(policy);
  });
});

// PUT a single item
app.put('/item/:id', (req, res) => {
  let query  = { _id : req.params.id }
  let update = {
    $set: {
      ownerId         : req.body.ownerId,
      categoryId      : req.body.categoryId,
      name            : req.body.name,
      serialNumber    : req.body.serialNumber,
      notes           : req.body.notes,
      replaceValue    : req.body.replaceValue,
      purchaseDate    : req.body.purchaseDate,
      placePurchased  : req.body.placePurchased,
      receipt         : req.body.receipt,
      image           : req.body.image
    }
  };

  Item.findOneAndUpdate(query, update, (err, item) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        message: 'Bad Request'
      });
    }
    res.status(200).json(item);
  });
});

// PUT a single category
app.put('/category/:id', (req, res) => {
  let query  = { _id : req.params.id }
  let update = {
    $set: {
      name        : req.body.name,
      description : req.body.description
    }
  };

  Category.findOneAndUpdate(query, update, (err, category) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        message: 'Bad Request'
      });
    }
    res.status(200).json(category);
  });
});


/*******************
 * DELETE Endpoints
 ******************/
// DELETE a single owner
app.delete('/owner/:id', (req, res) => {
  let query = { _id: req.params.id };
  Owner.findOneAndRemove(query, (err, owner) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        message: 'Bad Request'
      });
    }
    res.status(200).json(owner);
  });
});

// DELETE a single policy
app.delete('/policy/:id', (req, res) => {
  let query = { _id: req.params.id };
  Policy.findOneAndRemove(query, (err, policy) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        message: 'Bad Request'
      });
    }
    res.status(200).json(policy);
  });
});

// DELETE a single item
app.delete('/item/:id', (req, res) => {
  let query = { _id: req.params.id };
  Item.findOneAndRemove(query, (err, item) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        message: 'Bad Request'
      });
    }
    res.status(200).json(item);
  });
});

// DELETE a single category
app.delete('/category/:id', (req, res) => {
  let query = { _id: req.params.id };
  Category.findOneAndRemove(query, (err, category) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        message: 'Bad Request'
      });
    }
    res.status(200).json(category);
  });
});


if (require.main === module) {
  runServer((err) => {
    if (err) {
      console.error(err);
    }
  });
};

/**********
 * Exports
 *********/
exports.app       = app;
exports.runServer = runServer;
