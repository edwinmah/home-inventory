/***************
 * Dependencies
 **************/
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import config from './config';
const app = express();


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
app.get('/owners', (req, res) => {
  Owner.find((err, owners) => {
    if (err) {
      return res.status(400).json({
        message: 'Bad Request'
      });
    }
    res.json(owners);
  });
});

// GET items for a single owner
app.get('/owner/:id', (req, res) => {
  let query  = { ownerId: req.params.id };
  Items.find(query, (err, ownerItems) => {
    if (err) {
      return res.status(400).json({
        message: 'Bad Request'
      });
    }
    res.status(200).json(ownerItems);
  });
});

// GET all policies
app.get('/policies', (req, res) => {
  Policy.find((err, policies) => {
    if (err) {
      return res.status(400).json({
        message: 'Bad Request'
      });
    }
    res.json(policies);
  });
});

// GET a single policy
app.get('/policy/:id', (req, res) => {
  let query  = { _id: req.params.id };
  Policy.findOne(query, (err, policy) => {
    if (err) {
      return res.status(400).json({
        message: 'Bad Request'
      });
    }
    res.status(200).json(policy);
  });
});

// GET all items
app.get('/items', (req, res) => {
  Item.find((err, items) => {
    if (err) {
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
      return res.status(400).json({
        message: 'Bad Request'
      });
    }
    res.status(200).json(item);
  });
});

// GET all categories
app.get('/categories', (req, res) => {
  Category.find((err, categories) => {
    if (err) {
      return res.status(400).json({
        message: 'Bad Request'
      });
    }
    res.json(categories);
  });
});

// GET items for a single category
app.get('/category/:id', (req, res) => {
  let query  = { categoryId: req.params.id };
  Items.find(query, (err, categoryItems) => {
    if (err) {
      return res.status(400).json({
        message: 'Bad Request'
      });
    }
    res.status(200).json(categoryItems);
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
    website      : req.body.website,
    phone        : req.body.phone,
    email        : req.body.email
  };

  Policy.create(query, (err, policy) => {
    if (err) {
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
      website      : req.body.website,
      phone        : req.body.phone,
      email        : req.body.email
    }
  };

  Policy.findOneAndUpdate(query, update, (err, policy) => {
    if (err) {
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
