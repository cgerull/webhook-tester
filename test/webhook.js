process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('GitHub webhooks', () => {
    // beforeEach((done) => {
    //     Book.remove({}, (err) => { 
    //        done();         
    //     });     
    // });
  after(function() {
    server.close();
  });
  /*
  * Test the /POST route
  */
  describe('/POST webhook without GitHub signature', () => {
      it('it should respond with an error message', (done) => {
        chai.request('http://localhost:3000')
            .post('/webhook')
            .set('Content-Type','application/json')
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
              done();
            });
      });
  });
});