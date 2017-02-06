global.DATABASE_URL = 'mongodb://localhost/home-inventory';


import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/server';
import Owner from '../server/models/owner';
import Policy from '../server/models/policy';
import Category from '../server/models/category';
import Item from '../server/models/item';
const should = chai.should();
const app    = server.app;


chai.use(chaiHttp);


/***************
 * Server Tests
 **************/
describe('Server should', function() {
  /*******************
   * Create test data
   ******************/
  let owners     = [];
  let categories = [];

  before(function(done) {
    server.runServer(function() {
      Owner.create(
        {
          googleId: 'sa1234',
          name    : 'Sara Allen',
          accessToken: 'abc123456',
          address : '1313 Mockingbird Lane NW #303',
          city    : 'Washington',
          state   : 'DC',
          zip     : '20017',
          phone   : '202-123-4567',
          email   : 'sallen@email.com'
        }, {
          googleId: 'js5678',
          name    : 'Joe',
          accessToken: 'xyx789012',
          address : '1717 Jennifer Street NW #B4',
          city    : 'Washington',
          state   : 'DC',
          zip     : '20016',
          phone   : '202-456-7890',
          email   : 'jshmoe@email.com'
        },
        function(err, sa1234, js5678) {
          owners.push(sa1234, js5678);
          done();
        });
    });
  });

  before(function(done) {
    server.runServer(function() {
      Category.create(
        {
          ownerId: owners[0]._id,
          name: 'Uncategorized',
          description: 'Items that don\'t fit any category'
        }, {
          ownerId: owners[0]._id,
          name: 'Furniture',
          description: ''
        }, {
          ownerId: owners[1]._id,
          name: 'Electronics',
          description: 'Includes TVs, stereo, etc.'
        }, {
          ownerId: owners[1]._id,
          name: 'Clothing',
          description: ''
        },
        function(err, Uncategorized, Furniture, Electronics, Clothing) {
          categories.push(Uncategorized, Furniture, Electronics, Clothing);
          done();
        });
    });
  });

  before(function(done) {
    server.runServer(function() {
      Policy.create(
        {
          ownerId      : owners[0]._id,
          company      : 'ABC Insurance',
          policyNumber : 'R398C',
          coverage     : 50000,
          website      : 'https://www.abcins.com',
          phone        : '800-777-7777',
          email        : 'contact@abc.com'
        }, {
          ownerId      : owners[1]._id,
          company      : 'XYZ Insurance',
          policyNumber : 'P38214K',
          coverage     : 60000,
          website      : 'https://www.xyzins.com',
          phone        : '800-888-9999',
          email        : 'contact@xyz.com'
        },
        function() {
          done();
        });
    });
  });

  before(function(done) {
    server.runServer(function() {
      Item.create(
        {
          ownerId         : owners[0]._id,
          categoryId      : categories[2]._id,
          name            : 'Epson laser printer',
          serialNumber    : 'EPL982-84392',
          notes           : 'Nulla vitae elit libero, a pharetra augue.',
          replaceValue    : 90,
          purchaseDate    : '2014-04-01',
          placePurchased  : 'Amazon',
          receipt         : 'https://aws.com?391301.png',
          image           : 'https://aws.com?3918319.png'
        }, {
          ownerId         : owners[0]._id,
          categoryId      : categories[1]._id,
          name            : 'Leather recliner',
          serialNumber    : 'none',
          notes           : '',
          replaceValue    : 1800,
          purchaseDate    : '2004-09-30',
          placePurchased  : 'Pottery Barn',
          receipt         : 'https://aws.com?3901994.png',
          image           : 'https://aws.com?3918319.png'
        }, {
          ownerId         : owners[1]._id,
          categoryId      : categories[1]._id,
          name            : 'Computer table',
          serialNumber    : '',
          notes           : 'Maecenas faucibus mollis interdum.',
          replaceValue    : 300,
          purchaseDate    : '2007-07-14',
          placePurchased  : 'IKEA',
          receipt         : 'https://aws.com?3920109.png',
          image           : 'https://aws.com?3014928.png'
        }, {
          ownerId         : owners[1]._id,
          categoryId      : categories[2]._id,
          name            : 'Epson flatbed scanner',
          serialNumber    : 'EPSC1893-39183',
          notes           : 'Sed posuere consectetur est at lobortis.',
          replaceValue    : 60,
          purchaseDate    : '2008-02-28',
          placePurchased  : 'Amazon',
          receipt         : 'https://aws.com?3810913.png',
          image           : 'https://aws.com?5837282.png'
        },
        function() {
          done();
        });
    });
  });


  /*******************
   * Remove test data
   ******************/
  after(function(done) {
    Owner.remove(function() {
      done();
    });
  });

  after(function(done) {
    Policy.remove(function() {
      done();
    });
  });

  after(function(done) {
    Item.remove(function() {
      done();
    });
  });

  after(function(done) {
    Category.remove(function() {
      done();
    });
  });


  /*********************
   * Authorization test
   ********************/
  it('require Google login', function(done) {
    chai.request(app)
      .get('/items')
      .end(function(err, res) {
        res.unauthorized.should.equal(true);
        res.should.have.status(401);
        done();
    })
  });


  /************
   * GET tests
   ***********/
  it('GET all owners', function(done) {
    chai.request(app)
      .get('/owners')
      .set('authorization', 'Bearer abc123456')
      .end(function(err, res) {
        should.equal(err, null);
        res.should.have.status(200);
        res.unauthorized.should.equal(false);
        res.should.be.json;
        res.body.should.be.an('array');
        res.body.should.have.length(1);
        res.body.forEach((owner) => {
          owner.should.include.keys('googleId','name', 'accessToken', 'address', 'city', 'state', 'zip', 'phone', 'email');
        });
        res.body[0].googleId.should.equal('sa1234');
        res.body[0].name.should.equal('Sara Allen');
        res.body[0].accessToken.should.equal('abc123456');
        res.body[0].address.should.equal('1313 Mockingbird Lane NW #303');
        res.body[0].city.should.equal('Washington');
        res.body[0].state.should.equal('DC');
        res.body[0].zip.should.equal('20017');
        res.body[0].phone.should.equal('202-123-4567');
        res.body[0].email.should.equal('sallen@email.com');
        done();
      });
  });

  it('GET all policies', function(done) {
    chai.request(app)
      .get('/policies')
      .set('authorization', 'Bearer abc123456')
      .end(function(err, res) {
        should.equal(err, null);
        res.unauthorized.should.equal(false);
        res.should.be.json;
        res.body.should.be.an('array');
        res.body.should.have.length(1);
        res.body.forEach((policy) => {
          policy.should.include.keys('ownerId', 'company', 'policyNumber', 'coverage', 'website', 'phone', 'email');
        });
        res.body[0].ownerId.should.equal(`${owners[0]._id}`);
        res.body[0].company.should.equal('ABC Insurance');
        res.body[0].policyNumber.should.equal('R398C');
        res.body[0].coverage.should.be.a('number');
        res.body[0].coverage.should.equal(50000);
        res.body[0].website.should.equal('https://www.abcins.com');
        res.body[0].phone.should.equal('800-777-7777');
        res.body[0].email.should.equal('contact@abc.com');
        done();
      })
  });

  it('GET all items', function(done) {
    chai.request(app)
      .get('/items')
      .set('authorization', 'Bearer abc123456')
      .end(function(err, res) {
        should.equal(err, null);
        res.unauthorized.should.equal(false);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.an('array');
        res.body.should.have.length(2);
        res.body.forEach((item) => {
          item.should.include.keys('ownerId', 'categoryId', 'name', 'serialNumber', 'notes', 'replaceValue', 'purchaseDate', 'placePurchased', 'receipt', 'image');
        });
        res.body[0].name.should.equal('Epson laser printer');
        res.body[1].name.should.equal('Leather recliner');
        done();
      });
  });

  it('GET all categories', function(done) {
    chai.request(app)
      .get('/categories')
      .set('authorization', 'Bearer abc123456')
      .end(function(err, res) {
        should.equal(err, null);
        res.unauthorized.should.equal(false);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.an('array');
        res.body.should.have.length(2);
        res.body.forEach((category) => {
          category.should.include.keys('ownerId', 'name', 'description');
        });
        res.body[0].name.should.equal('Uncategorized');
        res.body[1].name.should.equal('Furniture');
        done();
      });
  });

  it('GET items for a single category', function(done) {
    chai.request(app)
      .get('/categories')
      .set('authorization', 'Bearer abc123456')
      .end(function(err, res) {
        should.equal(err, null);
        res.unauthorized.should.equal(false);
        res.body.forEach((category) => {
          category.should.have.property('_id');
        });
        chai.request(app)
          .get('/category/' + res.body[1]._id + '/items')
          .end(function(err, res) {
            should.equal(err, null);
            res.unauthorized.should.equal(false);
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.an('array');
            res.body.should.have.length(2);
            res.body[0].name.should.equal('Leather recliner');
            res.body[1].name.should.equal('Computer table');
            done();
          })
      });
  });


  /*************
   * POST tests
   ************/
//  it('POST a single owner', function(done) {
//    chai.request(app)
//      .post('/owner')
//      .set('authorization', 'Bearer abc123456')
//      .send({
//        googleId    : 'rl0986',
//        name        : 'Ragnar Lothbrock',
//        accessToken : 'abc123456',
//        address     : '123 7th Street NW #801',
//        city        : 'Washington',
//        state       : 'DC',
//        zip         : '20001',
//        phone       : '202-111-1111',
//        email       : 'rlothbrock@email.com'
//      })
//      .end(function(err, res) {
//        should.equal(err, null);
//        res.unauthorized.should.equal(false);
//        res.should.have.status(201);
//        res.should.be.json;
//        res.body.should.be.an('object');
//        res.body.should.include.keys('googleId', 'name', 'accessToken', 'address', 'city', 'state', 'zip', 'phone', 'email');
//        res.body.name.should.equal('Ragnar Lothbrock');
//        chai.request(app)
//          .get('/owners')
//          .set('authorization', 'Bearer abc123456')
//          .end(function(err, res) {
//            should.equal(err, null);
//            res.unauthorized.should.equal(false);
//            res.should.have.status(200);
//            res.should.be.json;
//            res.body.should.be.an('array');
//            res.body.should.have.length(2);
//            done();
//          })
//      });
//  });

  it('POST a single policy', function(done) {
    chai.request(app)
      .post('/policy')
      .set('authorization', 'Bearer abc123456')
      .send({
        ownerId      : owners[0]._id,
        company      : 'Mickey Mouse Insurance',
        policyNumber : 'PO4938',
        coverage     : 40000,
        website      : 'https://www.mminsurance.com',
        phone        : '888-222-2222',
        email        : 'contact@email.com'
      })
      .end(function(err, res) {
        should.equal(err, null);
        res.unauthorized.should.equal(false);
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.an('object');
        res.body.should.include.keys('ownerId', 'company', 'policyNumber', 'coverage', 'website', 'phone', 'email');
        res.body.company.should.equal('Mickey Mouse Insurance');
        chai.request(app)
          .get('/policies')
          .set('authorization', 'Bearer abc123456')
          .end(function(err, res) {
            should.equal(err, null);
            res.unauthorized.should.equal(false);
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.an('array');
            res.body.should.have.length(2);
            done();
          })
      });
  });

  it('POST a single item', function(done) {
    chai.request(app)
      .post('/item')
      .set('authorization', 'Bearer abc123456')
      .send({
        ownerId        : owners[0]._id,
        categoryId     : categories[1]._id,
        name           : 'Book shelf',
        serialNumber   : '',
        notes          : '',
        replaceValue   : 90,
        purchaseDate   : '2008-10-12',
        placePurchased : 'Target',
        receipt        : 'https://aws.com?23u4u2384u.png',
        image          : 'https://aws.com?2309852091.png'
      })
      .end(function(err, res) {
        should.equal(err, null);
        res.unauthorized.should.equal(false);
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.an('object');
        res.body.should.include.keys('ownerId', 'categoryId', 'name', 'serialNumber', 'notes', 'replaceValue', 'purchaseDate', 'placePurchased', 'receipt', 'image');
        res.body.name.should.equal('Book shelf');
        chai.request(app)
          .get('/items')
          .set('authorization', 'Bearer abc123456')
          .end(function(err, res) {
            should.equal(err, null);
            res.unauthorized.should.equal(false);
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.an('array');
            res.body.should.have.length(3);
            done();
          })
      });
  });

  it('POST a single category', function(done) {
    chai.request(app)
      .post('/category')
      .set('authorization', 'Bearer abc123456')
      .send({
        ownerId     : owners[0]._id,
        name        : 'Kitchenware',
        description : 'Includes pots, pans, plates, utensils, etc.'
      })
      .end(function(err, res) {
        should.equal(err, null);
        res.unauthorized.should.equal(false);
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.an('object');
        res.body.should.include.keys('name', 'description');
        res.body.name.should.equal('Kitchenware');
        chai.request(app)
          .get('/categories')
          .set('authorization', 'Bearer abc123456')
          .end(function(err, res) {
            should.equal(err, null);
            res.unauthorized.should.equal(false);
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.an('array');
            res.body.should.have.length(3);
            done();
          })
      });
  });


  /*************
   * PUT tests
   ************/
  it('PUT a single owner', function(done) {
    chai.request(app)
      .get('/owners')
      .set('authorization', 'Bearer abc123456')
      .end(function(err, res) {
        should.equal(err, null);
        res.unauthorized.should.equal(false);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.an('array');
        res.body.should.have.length(1);
        res.body[0].address.should.equal('1313 Mockingbird Lane NW #303');
        chai.request(app)
          .put('/owner/' + res.body[0]._id)
          .set('authorization', 'Bearer abc123456')
          .send({
            googleId    : 'sa1234',
            name        : 'Sara Allen',
            accessToken : 'abc123456',
            address     : '333 Bluebird Lane NW #402',
            city        : 'Washington',
            state       : 'DC',
            zip         : '20017',
            phone       : '202-123-4567',
            email       : 'sallen@email.com'
          })
          .end(function(err, res) {
            should.equal(err, null);
            res.unauthorized.should.equal(false);
            res.should.have.status(200);
            chai.request(app)
              .get('/owners')
              .set('authorization', 'Bearer abc123456')
              .end(function(err, res) {
                should.equal(err, null);
                res.unauthorized.should.equal(false)
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(1);
                res.body[0].should.include.keys('googleId', 'name', 'accessToken', 'address', 'city', 'state', 'zip', 'phone', 'email');
                res.body[0].address.should.equal('333 Bluebird Lane NW #402');
                done();
              });
          });
      });
  });

  it('PUT a single policy', function(done) {
    chai.request(app)
      .get('/policies')
      .set('authorization', 'Bearer abc123456')
      .end(function(err, res) {
        should.equal(err, null);
        res.unauthorized.should.equal(false);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.an('array');
        res.body.should.have.length(2);
        res.body[0].coverage.should.equal(50000);
        chai.request(app)
          .put('/policy/' + res.body[0]._id)
          .set('authorization', 'Bearer abc123456')
          .send({
            ownerId      : owners[0]._id,
            company      : 'ABC Insurance',
            policyNumber : 'R398C',
            coverage     : 70000,
            website      : 'https://www.abcins.com',
            phone        : '800-777-7777',
            email        : 'contact@abc.com'
          })
          .end(function(err, res) {
            should.equal(err, null);
            res.unauthorized.should.equal(false);
            res.should.have.status(200);
            chai.request(app)
              .get('/policies')
              .set('authorization', 'Bearer abc123456')
              .end(function(err, res) {
                should.equal(err, null);
                res.unauthorized.should.equal(false);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(2);
                res.body[0].should.include.keys('ownerId', 'company', 'policyNumber', 'coverage', 'website', 'phone', 'email');
                res.body[0].coverage.should.equal(70000);
                done();
              });
          });
      });
  });

  it('PUT a single item', function(done) {
    chai.request(app)
      .get('/items')
      .set('authorization', 'Bearer abc123456')
      .end(function(err, res) {
        should.equal(err, null);
        res.unauthorized.should.equal(false);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.an('array');
        res.body.should.have.length(3);
        res.body[1].notes.should.equal('');
        chai.request(app)
          .put('/item/' + res.body[1]._id)
          .set('authorization', 'Bearer abc123456')
          .send({
            ownerId         : owners[0]._id,
            categoryId      : categories[1]._id,
            name            : 'Leather recliner',
            serialNumber    : 'none',
            notes           : 'edited note',
            replaceValue    : 1800,
            purchaseDate    : '2004-09-30',
            placePurchased  : 'Pottery Barn',
            receipt         : 'https://aws.com?3901994.png',
            image           : 'https://aws.com?3918319.png'
          })
          .end(function(err, res) {
            should.equal(err, null);
            res.unauthorized.should.equal(false);
            res.should.have.status(200);
            chai.request(app)
              .get('/items')
              .set('authorization', 'Bearer abc123456')
              .end(function(err, res) {
                should.equal(err, null);
                res.unauthorized.should.equal(false);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(3);
                res.body[1].should.include.keys('ownerId', 'categoryId', 'name', 'serialNumber', 'notes', 'replaceValue', 'purchaseDate', 'placePurchased', 'receipt', 'image');
                res.body[1].notes.should.equal('edited note');
                done();
              });
          });
      });
  });

  it('PUT a single category', function(done) {
    chai.request(app)
      .get('/categories')
      .set('authorization', 'Bearer abc123456')
      .end(function(err, res) {
        should.equal(err, null);
        res.unauthorized.should.equal(false);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.an('array');
        res.body.should.have.length(3);
        res.body[0].name.should.equal('Uncategorized');
        chai.request(app)
          .put('/category/' + res.body[0]._id)
          .set('authorization', 'Bearer abc123456')
          .send({
            ownerId     : owners[0]._id,
            name        : 'Miscellaneous',
            description : 'Anything and everything'
          })
          .end(function(err, res) {
            should.equal(err, null);
            res.unauthorized.should.equal(false);
            res.should.have.status(200);
            chai.request(app)
              .get('/categories')
              .set('authorization', 'Bearer abc123456')
              .end(function(err, res) {
                should.equal(err, null);
                res.unauthorized.should.equal(false);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(3);
                res.body[0].should.include.keys('ownerId', 'name', 'description');
                res.body[0].name.should.equal('Miscellaneous');
                res.body[0].description.should.equal('Anything and everything');
                done();
              });
          });
      });
  });


  /***************
   * DELETE tests
   **************/

  it('DELETE a single policy', function(done) {
    chai.request(app)
      .get('/policies')
      .set('authorization', 'Bearer abc123456')
      .end(function(err, res) {
        should.equal(err, null);
        res.unauthorized.should.equal(false);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.an('array');
        res.body.should.have.length(2);
        res.body[0].company.should.equal('ABC Insurance');
        chai.request(app)
          .delete('/policy/' + res.body[0]._id)
          .set('authorization', 'Bearer abc123456')
          .end(function(err, res) {
            should.equal(err, null);
            res.unauthorized.should.equal(false);
            res.should.have.status(200);
            chai.request(app)
              .get('/policies')
              .set('authorization', 'Bearer abc123456')
              .end(function(err, res) {
                should.equal(err, null);
                res.unauthorized.should.equal(false);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.an('array');
                res.body.should.have.length(1);
                done();
              });
          });
      });
  });

  it('DELETE a single item', function(done) {
    chai.request(app)
      .get('/items')
      .set('authorization', 'Bearer abc123456')
      .end(function(err, res) {
        should.equal(err, null);
        res.unauthorized.should.equal(false);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.an('array');
        res.body.should.have.length(3);
        res.body[2].name.should.equal('Book shelf');
        res.body[2].replaceValue.should.be.a('number');
        res.body[2].replaceValue.should.equal(90);
        chai.request(app)
          .delete('/item/' + res.body[2]._id)
          .set('authorization', 'Bearer abc123456')
          .end(function(err, res) {
            should.equal(err, null);
            res.unauthorized.should.equal(false);
            res.should.have.status(200);
            chai.request(app)
              .get('/items')
              .set('authorization', 'Bearer abc123456')
              .end(function(err, res) {
                should.equal(err, null);
                res.unauthorized.should.equal(false);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.an('array');
                res.body.should.have.length(2);
                done();
              });
          });
      });
  });

  it('DELETE a single category', function(done) {
    chai.request(app)
      .get('/categories')
      .set('authorization', 'Bearer abc123456')
      .end(function(err, res) {
        should.equal(err, null);
        res.unauthorized.should.equal(false);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.an('array');
        res.body.should.have.length(3);
        res.body[0].name.should.equal('Miscellaneous');
        chai.request(app)
          .delete('/category/' + res.body[0]._id)
          .set('authorization', 'Bearer abc123456')
          .end(function(err, res) {
            should.equal(err, null);
            res.unauthorized.should.equal(false);
            res.should.have.status(200);
            chai.request(app)
              .get('/categories')
              .set('authorization', 'Bearer abc123456')
              .end(function(err, res) {
                should.equal(err, null);
                res.unauthorized.should.equal(false);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.an('array');
                res.body.should.have.length(2);
                res.body[0].name.should.equal('Furniture');
                done();
              });
          });
      });
  });

  it('DELETE a single owner', function(done) {
    chai.request(app)
      .get('/owners')
      .set('authorization', 'Bearer abc123456')
      .end(function(err, res) {
        should.equal(err, null);
        res.unauthorized.should.equal(false);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.an('array');
        res.body.should.have.length(1);
        res.body[0].name.should.equal('Sara Allen');
        chai.request(app)
          .delete('/owner/' + res.body[0]._id)
          .set('authorization', 'Bearer abc123456')
          .end(function(err, res) {
            should.equal(err, null);
            res.unauthorized.should.equal(false);
            res.should.have.status(200);
            chai.request(app)
              .get('/owners')
              .set('authorization', 'Bearer abc123456')
              .end(function(err, res) {
                res.unauthorized.should.equal(true);
                res.should.have.status(401);
                res.body.should.be.an('object');
                Object.keys(res.body).should.have.length(0);
                done();
              });
          });
      });
  });

}); // end server tests
