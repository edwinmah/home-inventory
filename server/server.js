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
app.use('/s3', require('react-dropzone-s3-uploader/s3router')({
  bucket: "homeinventorybucket",
  region: 'us-east-1',
  headers: {'Access-Control-Allow-Origin': '*'},
  ACL: 'public-read'
}));


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


/***************
 * Default data
 **************/
//Owner.create(
//  {
//    name    : 'Your Name',
//    address : 'Your Address',
//    city    : 'City',
//    state   : 'State',
//    zip     : '12345',
//    phone   : '123-456-7890',
//    email   : 'yourname@email.com'
//  },
//  (err, owner) => {
//    Policy.create(
//      {
//        ownerId      : owner._id,
//        company      : 'Insurance company name',
//        policyNumber : 'Policy number',
//        coverage     : 0,
//        website      : 'Company website',
//        phone        : '456-789-1023',
//        email        : 'email@company.com'
//      }
//    );
//
//    Category.create(
//      {
//        name: 'Uncategorized',
//        description: 'Items that don\'t fit any category'
//      }, {
//        name: 'Furniture',
//        description: 'Includes all household furniture'
//      }, {
//        name: 'Electronics',
//        description: 'Includes TVs, stereo, etc.'
//      }, {
//        name: 'Clothing',
//        description: ''
//      }, {
//        name: 'Linens',
//        description: 'Includes sheets, towels, blankets, etc.'
//      }, {
//        name: 'Bathroom',
//        description: 'Includes any bathroom items, etc.'
//      }, {
//        name: 'Books and media',
//        description: 'Includes books, CDs, DVDs, etc.'
//      }, {
//        name: 'Artwork',
//        description: 'Includes paintings, photos, sculptures, etc.'
//      }, {
//        name: 'Plants',
//        description: ''
//      }
//    );
//  }
//);


//Item.create(
//  {
//    ownerId         : '58864bfe6ffcc004240beaed',
//    categoryId      : '58864bfe6ffcc004240beaf1',
//    name            : 'Epson laser printer',
//    serialNumber    : 'EPL982-84392',
//    notes           : 'Nulla vitae elit libero, a pharetra augue.',
//    replaceValue    : 90,
//    purchaseDate    : '2014-04-01',
//    placePurchased  : 'Amazon',
//    receipt         : 'https://aws.com?391301.png',
//    image           : 'https://aws.com?3918319.png'
//  }, {
//    ownerId         : '58864bfe6ffcc004240beaed',
//    categoryId      : '58864bfe6ffcc004240beaf0',
//    name            : 'Leather recliner',
//    serialNumber    : 'none',
//    notes           : '',
//    replaceValue    : 1800,
//    purchaseDate    : '2004-09-30',
//    placePurchased  : 'Pottery Barn',
//    receipt         : 'https://aws.com?3901994.png',
//    image           : 'https://aws.com?3918319.png'
//  }, {
//    ownerId         : '58864bfe6ffcc004240beaed',
//    categoryId      : '58864bfe6ffcc004240beaf0',
//    name            : 'Computer table',
//    serialNumber    : '',
//    notes           : 'Maecenas faucibus mollis interdum.',
//    replaceValue    : 300,
//    purchaseDate    : '2007-07-14',
//    placePurchased  : 'IKEA',
//    receipt         : 'https://aws.com?3920109.png',
//    image           : 'https://aws.com?3014928.png'
//  }, {
//    ownerId         : '58864bfe6ffcc004240beaed',
//    categoryId      : '58864bfe6ffcc004240beaf1',
//    name            : 'Epson flatbed scanner',
//    serialNumber    : 'EPSC1893-39183',
//    notes           : 'Sed posuere consectetur est at lobortis.',
//    replaceValue    : 60,
//    purchaseDate    : '2008-02-28',
//    placePurchased  : 'Amazon',
//    receipt         : 'https://aws.com?3810913.png',
//    image           : 'https://aws.com?5837282.png'
//  }, {
//    ownerId         : '58864bfe6ffcc004240beaed',
//    categoryId      : '58864bfe6ffcc004240beaf2',
//    name            : 'Blue Jeans',
//    serialNumber    : '',
//    notes           : 'Ipsum Pellentesque Magna.',
//    replaceValue    : 170,
//    purchaseDate    : '2015-11-28',
//    placePurchased  : 'Banana Republic',
//    receipt         : 'https://aws.com?3812843.png',
//    image           : 'https://aws.com?9817282.png'
//  }, {
//    ownerId         : '58864bfe6ffcc004240beaed',
//    categoryId      : '58864bfe6ffcc004240beaf3',
//    name            : 'Queen-size Bed Comfortor',
//    serialNumber    : '',
//    notes           : 'Aenean lacinia bibendum nulla sed consectetur.',
//    replaceValue    : 110,
//    purchaseDate    : '2015-11-28',
//    placePurchased  : 'Target',
//    receipt         : 'https://aws.com?1332813.png',
//    image           : 'https://aws.com?1384722.png'
//  }, {
//    ownerId        : '58864bfe6ffcc004240beaed',
//    categoryId     : '58864bfe6ffcc004240beaf0',
//    name           : 'Book shelf',
//    serialNumber   : '',
//    notes          : '',
//    replaceValue   : 90,
//    purchaseDate   : '2008-10-12',
//    placePurchased : 'Target',
//    receipt        : 'https://aws.com?23u4u2384u.png',
//    image          : 'https://aws.com?2309852091.png'
//  }, {
//    ownerId         : '58864bfe6ffcc004240beaed',
//    categoryId      : '58864bfe6ffcc004240beaf2',
//    name            : 'Khaki Pants',
//    serialNumber    : '',
//    notes           : '4 pairs',
//    replaceValue    : 180,
//    purchaseDate    : '2014-9-15',
//    placePurchased  : 'Banana Republic',
//    receipt         : 'https://aws.com?1239843.png',
//    image           : 'https://aws.com?4716422.png'
//  }
//);

/****************
 * GET Endpoints
 ***************/
// GET all owners
app.get('/owners', (req, res) => {
  Owner.find((err, owners) => {
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
app.get('/policies', (req, res) => {
  Policy.find((err, policies) => {
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
  let query  = { _id: req.params.id };
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
app.get('/items', (req, res) => {
  Item.find((err, items) => {
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
app.get('/categories', (req, res) => {
  Category.find((err, categories) => {
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
