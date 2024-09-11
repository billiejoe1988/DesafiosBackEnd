import chai from 'chai';
import supertest from 'supertest';
import app from '../server.js';  

const { expect } = chai;
const request = supertest(app);

describe('Sessions API', () => {
    it('should log in a user successfully', async () => {
      const loginCredentials = { username: 'testUser', password: 'testPassword' };
      const res = await request.post('/sessions/login').send(loginCredentials);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('token');
    });
  
    it('should return 401 for invalid login', async () => {
      const invalidCredentials = { username: 'wrongUser', password: 'wrongPassword' };
      const res = await request.post('/sessions/login').send(invalidCredentials);
      expect(res.status).to.equal(401);
      expect(res.body.message).to.equal('Invalid credentials');
    });
  
    it('should log out the user', async () => {
      const res = await request.post('/sessions/logout');
      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal('Logout successful');
    });
  });
  