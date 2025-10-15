const request = require('supertest');
const app = require('../src/server');

describe('User API', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({
        email: 'testuser@example.com',
        password: 'Test@1234',
        age: 25,
        address: {
          house: '123',
          city: 'TestCity',
          state: 'TS',
          pin: '123456'
        }
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('User registered successfully');
  });

  it('should not register with existing email', async () => {
    await request(app)
      .post('/api/users/register')
      .send({
        email: 'testuser@example.com',
        password: 'Test@1234',
        age: 25,
        address: {
          house: '123',
          city: 'TestCity',
          state: 'TS',
          pin: '123456'
        }
      });
    const res = await request(app)
      .post('/api/users/register')
      .send({
        email: 'testuser@example.com',
        password: 'Test@1234',
        age: 25,
        address: {
          house: '123',
          city: 'TestCity',
          state: 'TS',
          pin: '123456'
        }
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Email already registered');
  });
});
