import chai from 'chai';
import chaiHttp from 'chai-http';
// import server from './server.mjs'; // Adjust the path as needed
import server from './server.mjs';
import { describe, it, before } from 'mocha';

const expect = chai.expect;
chai.use(chaiHttp);

// Authentication API Endpoints Tests
describe('Authentication API Endpoints', () => {
  describe('POST /api/auth/signup', () => {
    it('should create a new user', (done) => {
      const newUser = {
        username: 'testuser',
        password: 'testpassword',
      };

      chai
        .request(app)
        .post('/api/auth/signup')
        .send(newUser)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('message').equal('User created successfully');
          done();
        });
    });
  });

  describe('POST /api/auth/login', () => {
    it('should log in the user with valid credentials', (done) => {
      const credentials = {
        username: 'testuser',
        password: 'testpassword',
      };

      chai
        .request(app)
        .post('/api/auth/login')
        .send(credentials)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('token');
          done();
        });
    });

    it('should return an error for invalid credentials', (done) => {
      const invalidCredentials = {
        username: 'nonexistentuser',
        password: 'invalidpassword',
      };

      chai
        .request(app)
        .post('/api/auth/login')
        .send(invalidCredentials)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('error').equal('Invalid username or password');
          done();
        });
    });
  });
});

// Notes API Endpoints Tests
describe('Notes API Endpoints', () => {
  let authToken;
  let noteId;

  // Perform login before running the tests
  before((done) => {
    const credentials = {
      username: 'testuser',
      password: 'testpassword',
    };

    chai
      .request(app)
      .post('/api/auth/login')
      .send(credentials)
      .end((err, res) => {
        authToken = res.body.token;
        done();
      });
  });

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

  describe('POST /api/notes', () => {
    it('should create a new note for the authenticated user', (done) => {
      const newNote = {
        title: 'Test Note',
        content: 'This is a test note.',
      };

      chai
        .request(app)
        .post('/api/notes')
        .set('Authorization', `${authToken}`)
        .send(newNote)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message').equal('Note created successfully');
          // Save the noteId for later use in other tests
          noteId = res.body.note._id;
          done();
        });
    });
  });

  describe('GET /api/notes/:id', () => {
    it('should return a single note by ID for the authenticated user', (done) => {
      chai
        .request(app)
        .get(`/api/notes/${noteId}`)
        .set('Authorization', `${authToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          // Add more assertions based on your note structure
          done();
        });
    });

    it('should return an error for an invalid note ID', (done) => {
      const invalidNoteId = 'invalid_id';

      chai
        .request(app)
        .get(`/api/notes/${invalidNoteId}`)
        .set('Authorization', `${authToken}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error').equal('Note not found');
          done();
        });
    });
  });

  describe('PUT /api/notes/:id', () => {
    it('should update a note by ID for the authenticated user', (done) => {
      const updatedNote = {
        title: 'Updated Test Note',
        content: 'This is the updated test note content.',
      };

      chai
        .request(app)
        .put(`/api/notes/${noteId}`)
        .set('Authorization', `${authToken}`)
        .send(updatedNote)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').equal('Note updated successfully');
          done();
        });
    });

    it('should return an error for updating with an invalid note ID', (done) => {
      const invalidNoteId = 'invalid_id';
      const updatedNote = {
        title: 'Updated Test Note',
        content: 'This is the updated test note content.',
      };

      chai
        .request(app)
        .put(`/api/notes/${invalidNoteId}`)
        .set('Authorization', `${authToken}`)
        .send(updatedNote)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error').equal('Note not found');
          done();
        });
    });
  });

  describe('DELETE /api/notes/:id', () => {
    it('should delete a note by ID for the authenticated user', (done) => {
      chai
        .request(app)
        .delete(`/api/notes/${noteId}`)
        .set('Authorization', `${authToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').equal('Note deleted successfully');
          done();
        });
    });

    it('should return an error for deleting with an invalid note ID', (done) => {
      const invalidNoteId = 'invalid_id';

      chai
        .request(app)
        .delete(`/api/notes/${invalidNoteId}`)
        .set('Authorization', `${authToken}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error').equal('Note not found');
          done();
        });
    });
  });

  describe('POST /api/notes/share', () => {
    it('should share a note with another user', (done) => {
      const sharedUserId = 'user_to_share_with_id';

      chai
        .request(app)
        .post('/api/notes/share')
        .set('Authorization', `${authToken}`)
        .send({
          noteId: 'valid_note_id', // Provide a valid note ID
          sharedUserId,
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').equal('Note shared successfully');
          done();
        });
    });

    it('should return an error for sharing with an invalid note ID', (done) => {
      const sharedUserId = 'user_to_share_with_id';

      chai
        .request(app)
        .post('/api/notes/share')
        .set('Authorization', `${authToken}`)
        .send({
          noteId: 'invalid_note_id',
          sharedUserId,
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error').equal('Note not found');
          done();
        });
    });

    it('should return an error for sharing with an invalid user ID', (done) => {
      chai
        .request(app)
        .post('/api/notes/share')
        .set('Authorization', `${authToken}`)
        .send({
          noteId: 'valid_note_id', // Provide a valid note ID
          sharedUserId: 'invalid_user_id',
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error').equal('User not found');
          done();
        });
    });

    // Add more test cases for sharing if needed
  });

  describe('GET /api/notes/search', () => {
    it('should return notes matching the search query', (done) => {
      const searchQuery = 'test';

      chai
        .request(app)
        .get(`/api/notes/search?q=${searchQuery}`)
        .set('Authorization', `${authToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          // Add more assertions based on your note structure
          done();
        });
    });
  });
});
