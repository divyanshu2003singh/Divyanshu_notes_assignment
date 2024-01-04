const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server'); // Import your Express app instance
const expect = chai.expect;

chai.use(chaiHttp);

describe('Notes API Endpoints', () => {
  // Dummy user token for authentication (replace with a valid token in a real-world scenario)
  const authToken = 'your_dummy_token';

  describe('GET /api/notes', () => {
    it('should return all notes for the authenticated user', (done) => {
      chai
        .request(app)
        .get('/api/notes')
        .set('Authorization', `${authToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  // Add more test cases for other endpoints as needed
});
