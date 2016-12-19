global.DATABASE_URL = 'mongodb://localhost/home-inventory';


import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/server';
import Owner from '../server/models/owner';
import Policy from '../server/models/policy';
import Category from '../server/models/category';
import Item from '../server/models/item';
const should   = chai.should();
const app      = server.app;
const storage  = server.storage;


chai.use(chaiHttp);


/***************
 * Server Tests
 **************/
describe('Server should', function() {
  /*******************
   * Create test data
   ******************/
  before(function(done) {
    server.runServer(function() {
      Owner.create(
        {
          name    : 'Sara Allen',
          address : '1313 Mockingbird Lane NW #303',
          city    : 'Washington',
          state   : 'DC',
          zip     : '20017',
          phone   : '202-123-4567',
          email   : 'sallen@email.com'
        }, {
          name    : 'Joe Schmoe',
          address : '1717 Jennifer Street NW #B4',
          city    : 'Washington',
          state   : 'DC',
          zip     : '20016',
          phone   : '202-456-7890',
          email   : 'jshmoe@email.com'
        },
        function() {
          done();
        });
    });
  });

  before(function(done) {
    server.runServer(function() {
      Policy.create(
        {
          ownerId      : '246',
          company      : 'ABC Insurance',
          policyNumber : 'R398C',
          coverage     : 50000,
          website      : 'https://www.abcins.com',
          phone        : '800-777-7777',
          email        : 'contact@abc.com'
        }, {
          ownerId      : '335',
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
          ownerId         : '100',
          categoryId      : '900',
          name            : 'Epson laser printer',
          serialNumber    : 'EPL982-84392',
          notes           : 'Nulla vitae elit libero, a pharetra augue.',
          replaceValue    : 90,
          purchaseDate    : '2014-04-01',
          placePurchased  : 'Amazon',
          receipt         : 'https://aws.com?391301.png',
          image           : 'https://aws.com?3918319.png'
        }, {
          ownerId         : '150',
          categoryId      : '400',
          name            : 'Leather recliner',
          serialNumber    : 'none',
          notes           : '',
          replaceValue    : 1800,
          purchaseDate    : '2004-09-30',
          placePurchased  : 'Pottery Barn',
          receipt         : 'https://aws.com?3901994.png',
          image           : 'https://aws.com?3918319.png'
        }, {
          ownerId         : '150',
          categoryId      : '400',
          name            : 'Computer table',
          serialNumber    : '',
          notes           : 'Maecenas faucibus mollis interdum.',
          replaceValue    : 300,
          purchaseDate    : '2007-07-14',
          placePurchased  : 'IKEA',
          receipt         : 'https://aws.com?3920109.png',
          image           : 'https://aws.com?3014928.png'
        }, {
          ownerId         : '100',
          categoryId      : '900',
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

  before(function(done) {
    server.runServer(function() {
      Category.create(
        {
          name: 'Uncategorized',
          description: 'Items that don\'t fit any category'
        }, {
          name: 'Furniture',
          description: ''
        }, {
          name: 'Electronics',
          description: 'Includes TVs, stereo, etc.'
        }, {
          name: 'Clothing',
          description: ''
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


  /******************
   * Basic load test
   *****************/
  it('load home page', function(done) {
    chai.request(app)
      .get('/')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.html;
        done();
    });
  });


  /************
   * GET tests
   ***********/
  it('GET all owners', function(done) {
    chai.request(app)
      .get('/owners')
      .end(function(err, res) {
        should.equal(err, null);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.an('array');
        res.body.should.have.length(2);

        for (let i = 0; i < res.body.length; i++) {
          res.body[i].should.include.keys('name', 'address', 'city', 'state', 'zip', 'phone', 'email');
        }

        res.body[0].name.should.equal('Sara Allen');
        res.body[1].name.should.equal('Joe Schmoe');
        done();
      });
  });

//  it('responds with a single owner', function(done) {
//    chai.request(app)
//      .get('/owners')
//      .end(function(err, res) {
//        should.equal(err, null);
//        res.should.have.status(200);
//        res.should.be.json;
//        res.body.should.be.an('array');
//        res.body.should.have.length(2);
//        chai.request(app)
//          .get('/owner/' + res.body[0]._id)
//          .end(function(err, res) {
//            res.should.have.status(200);
//            res.should.be.json;
//            res.body.should.be.an('array');
//            res.body.should.have.length(1);
//            res.body[0].should.include.keys('name', 'address', 'city', 'state', 'zip', 'phone', 'email');
//            res.body[0].name.should.equal('Sara Allen');
//            done();
//          });
//      });
//  });

  it('GET all policies', function(done) {
    chai.request(app)
      .get('/policies')
      .end(function(err, res) {
        should.equal(err, null);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.an('array');
        res.body.should.have.length(2);

        for (let i = 0; i < res.body.length; i++) {
          res.body[i].should.include.keys('ownerId', 'company', 'policyNumber', 'coverage', 'website', 'phone', 'email');
        }

        res.body[0].ownerId.should.equal('246');
        res.body[1].ownerId.should.equal('335');
        done();
      });
  });

//  it('responds with a single policy', function(done) {
//    chai.request(app)
//      .get('/policies')
//      .end(function(err, res) {
//        should.equal(err, null);
//        res.should.have.status(200);
//        res.should.be.json;
//        res.body.should.be.an('array');
//        res.body.should.have.length(2);
//        chai.request(app)
//          .get('/policy/' + res.body[0]._id)
//          .end(function(err, res) {
//            res.should.have.status(200);
//            res.should.be.json;
//            res.body.should.be.an('object');
//            res.body.should.include.keys('ownerId', 'company', 'policyNumber', 'coverage', 'website', 'phone', 'email');
//            res.body.ownerId.should.equal('246');
//            done();
//          });
//      });
//  });

  it('GET all items', function(done) {
    chai.request(app)
      .get('/items')
      .end(function(err, res) {
        should.equal(err, null);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.an('array');
        res.body.should.have.length(4);

        for (let i = 0; i < res.body.length; i++) {
          res.body[i].should.include.keys('ownerId', 'categoryId', 'name', 'serialNumber', 'notes', 'replaceValue', 'purchaseDate', 'placePurchased', 'receipt', 'image');
        }

        res.body[0].name.should.equal('Epson laser printer');
        res.body[1].name.should.equal('Leather recliner');
        res.body[2].name.should.equal('Computer table');
        res.body[3].name.should.equal('Epson flatbed scanner');
        done();
      });
  });

  it('GET all categories', function(done) {
    chai.request(app)
      .get('/categories')
      .end(function(err, res) {
      should.equal(err, null);
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.an('array');
      res.body.should.have.length(4);

      for (let i = 0; i < res.body.length; i++) {
        res.body[i].should.include.keys('name', 'description');
      }

      res.body[0].name.should.equal('Uncategorized');
      res.body[1].name.should.equal('Furniture');
      res.body[2].name.should.equal('Electronics');
      res.body[3].name.should.equal('Clothing');
      done();
    });
  });


  /*************
   * POST tests
   ************/
  it('POST a single owner', function(done) {
    chai.request(app)
      .post('/owner')
      .send({
        name    : 'Ragnar Lothbrock',
        address : '123 7th Street NW #801',
        city    : 'Washington',
        state   : 'DC',
        zip     : '20001',
        phone   : '202-111-1111',
        email   : 'rlothbrock@email.com'
      })
      .end(function(err, res) {
        should.equal(err, null);
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.an('object');
        res.body.should.include.keys('name', 'address', 'city', 'state', 'zip', 'phone', 'email');
        res.body.name.should.equal('Ragnar Lothbrock');
        chai.request(app)
          .get('/owners')
          .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.an('array');
            res.body.should.have.length(3);
            done();
          })
      });
  });

  it('POST a single policy', function(done) {
    chai.request(app)
      .post('/policy')
      .send({
        ownerId      : '700',
        company      : 'Mickey Mouse Insurance',
        policyNumber : 'PO4938',
        coverage     : 40000,
        website      : 'https://www.mminsurance.com',
        phone        : '888-222-2222',
        email        : 'contact@email.com'
      })
      .end(function(err, res) {
        should.equal(err, null);
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.an('object');
        res.body.should.include.keys('ownerId', 'company', 'policyNumber', 'coverage', 'website', 'phone', 'email');
        res.body.company.should.equal('Mickey Mouse Insurance');
        chai.request(app)
          .get('/policies')
          .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.an('array');
            res.body.should.have.length(3);
            done();
          })
      });
  });

  it('POST a single item', function(done) {
    chai.request(app)
      .post('/item')
      .send({
        ownerId        : '444',
        categoryId     : '400',
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
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.an('object');
        res.body.should.include.keys('ownerId', 'categoryId', 'name', 'serialNumber', 'notes', 'replaceValue', 'purchaseDate', 'placePurchased', 'receipt', 'image');
        res.body.name.should.equal('Book shelf');
        chai.request(app)
          .get('/items')
          .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.an('array');
            res.body.should.have.length(5);
            done();
          })
      });
  });

  it('POST a single category', function(done) {
    chai.request(app)
      .post('/category')
      .send({
        name        : 'Kitchenware',
        description : 'Includes pots, pans, plates, utensils, etc.'
      })
      .end(function(err, res) {
        should.equal(err, null);
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.an('object');
        res.body.should.include.keys('name', 'description');
        res.body.name.should.equal('Kitchenware');
        chai.request(app)
          .get('/categories')
          .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.an('array');
            res.body.should.have.length(5);
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
      .end(function(err, res) {
        should.equal(err, null);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.an('array');
        res.body.should.have.length(3);
        res.body[0].address.should.equal('1313 Mockingbird Lane NW #303');
        chai.request(app)
          .put('/owner/' + res.body[0]._id)
          .send({
            name    : 'Sara Allen',
            address : '333 Bluebird Lane NW #402',
            city    : 'Washington',
            state   : 'DC',
            zip     : '20017',
            phone   : '202-123-4567',
            email   : 'sallen@email.com'
          })
          .end(function(err, res) {
            should.equal(err, null);
            res.should.have.status(200);
            chai.request(app)
              .get('/owners')
              .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(3);
                res.body[0].should.include.keys('name', 'address', 'city', 'state', 'zip', 'phone', 'email');
                res.body[0].address.should.equal('333 Bluebird Lane NW #402');
                done();
              });
          });
      });
  });

  it('PUT a single policy', function(done) {
    chai.request(app)
      .get('/policies')
      .end(function(err, res) {
        should.equal(err, null);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.an('array');
        res.body.should.have.length(3);
        res.body[0].coverage.should.equal(50000);
        chai.request(app)
          .put('/policy/' + res.body[0]._id)
          .send({
            ownerId      : '246',
            company      : 'ABC Insurance',
            policyNumber : 'R398C',
            coverage     : 70000,
            website      : 'https://www.abcins.com',
            phone        : '800-777-7777',
            email        : 'contact@abc.com'
          })
          .end(function(err, res) {
            should.equal(err, null);
            res.should.have.status(200);
            chai.request(app)
              .get('/policies')
              .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(3);
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
      .end(function(err, res) {
        should.equal(err, null);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.an('array');
        res.body.should.have.length(5);
        res.body[1].notes.should.equal('');
        chai.request(app)
          .put('/item/' + res.body[1]._id)
          .send({
            ownerId         : '150',
            categoryId      : '400',
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
            res.should.have.status(200);
            chai.request(app)
              .get('/items')
              .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(5);
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
      .end(function(err, res) {
        should.equal(err, null);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.an('array');
        res.body.should.have.length(5);
        res.body[3].name.should.equal('Clothing');
        chai.request(app)
          .put('/category/' + res.body[3]._id)
          .send({
            name: 'Clothing and linens',
            description: ''
          })
          .end(function(err, res) {
            should.equal(err, null);
            res.should.have.status(200);
            chai.request(app)
              .get('/categories')
              .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(5);
                res.body[3].should.include.keys('name', 'description');
                res.body[3].name.should.equal('Clothing and linens');
                done();
              });
          });
      });
  });


  /***************
   * DELETE tests
   **************/
  it('DELETE a single owner', function(done) {
    chai.request(app)
      .get('/owners')
      .end(function(err, res) {
        should.equal(err, null);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.should.have.length(3);
        res.body[1].name.should.equal('Joe Schmoe');
        chai.request(app)
          .delete('/owner/' + res.body[1]._id)
          .end(function(err, res) {
            should.equal(err, null);
            res.should.have.status(200);
            chai.request(app)
              .get('/owners')
              .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(2);
                res.body[1].name.should.equal('Ragnar Lothbrock');
                done();
              });
          });
      });
  });

  it('DELETE a single policy', function(done) {
    chai.request(app)
      .get('/policies')
      .end(function(err, res) {
        should.equal(err, null);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.should.have.length(3);
        res.body[0].company.should.equal('ABC Insurance');
        chai.request(app)
          .delete('/policy/' + res.body[0]._id)
          .end(function(err, res) {
            should.equal(err, null);
            res.should.have.status(200);
            chai.request(app)
              .get('/policies')
              .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(2);
                res.body[0].company.should.equal('XYZ Insurance');
                done();
              });
          });
      });
  });

  it('DELETE a single item', function(done) {
    chai.request(app)
      .get('/items')
      .end(function(err, res) {
        should.equal(err, null);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.should.have.length(5);
        res.body[3].name.should.equal('Epson flatbed scanner');
        res.body[3].serialNumber.should.equal('EPSC1893-39183');
        chai.request(app)
          .delete('/item/' + res.body[3]._id)
          .end(function(err, res) {
            should.equal(err, null);
            res.should.have.status(200);
            chai.request(app)
              .get('/items')
              .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(4);
                res.body[3].name.should.equal('Book shelf');
                res.body[3].serialNumber.should.equal('');
                done();
              });
          });
      });
  });

  it('DELETE a single category', function(done) {
    chai.request(app)
      .get('/categories')
      .end(function(err, res) {
        should.equal(err, null);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.should.have.length(5);
        res.body[0].name.should.equal('Uncategorized');
        chai.request(app)
          .delete('/category/' + res.body[0]._id)
          .end(function(err, res) {
            should.equal(err, null);
            res.should.have.status(200);
            chai.request(app)
              .get('/categories')
              .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(4);
                res.body[0].name.should.equal('Furniture');
                done();
              });
          });
      });
  });

}); // end server tests
