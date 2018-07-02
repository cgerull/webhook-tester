/*
* Test webhook
*/

// Test object and encryption routine
const crypto = require('crypto'),
  key = 'myTestSecret',
  obj = {
    some: 'github',
    repository: {
        "id": 1296269,
        "name": "cgerull/express-app",
    },
    "action": "opened",
    "issue": {
      "url": "https://api.github.com/repos/octocat/Hello-World/issues/1347",
      "number": 1347,
      'title': 'Testing webhook'
    }
  }, 
  json = JSON.stringify(obj);

function signBlob(key, blob) {
  return 'sha1=' +
    crypto.createHmac('sha1', key).update(blob).digest('hex')
}

// Run in test environment
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
  describe('/POST webhook with signature and payload', () => {
    it('it should pass and log the payload', (done) => {
      shaSign = signBlob(key, json);
      console.log('sha1 = ' + shaSign);
      chai.request('http://localhost:3000')
        .post('/webhook')
        .set('Content-Type', 'application/json')
        .set('X-GitHub-Event', 'issues')
        .set('X-Hub-Signature', shaSign)

        .set('X-Github-Delivery', '72d3162e-cc78-11e3-81ab-4c9367dc0958')
        .send(json)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('ok');
            done();
        });
    });
  });
});