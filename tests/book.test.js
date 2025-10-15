const request = require('supertest');
const app = require('../src/server');

describe('Book API', () => {
  let token = '';
  let bookId = '';

  beforeAll(async () => {
    // Register and login user
    await request(app)
      .post('/api/users/register')
      .send({
        email: 'bookuser@example.com',
        password: 'Book@1234',
        age: 30,
        address: {
          house: '456',
          city: 'BookCity',
          state: 'BK',
          pin: '654321'
        }
      });
    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'bookuser@example.com',
        password: 'Book@1234'
      });
    token = res.body.token;
  });

  // Placeholder test to prevent Jest failure on empty file
  test('placeholder', () => {
    expect(true).toBe(true);
  });
});
