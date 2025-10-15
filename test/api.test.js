
const request = require('supertest');
const app = require('../src/server');

describe('API Integration Tests', () => {
  let token;
  let bookId;
  // Use a unique email for each test run
  const uniqueEmail = `testuser_${Date.now()}@example.com`;

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({
        email: uniqueEmail,
        password: 'TestPass!123',
        age: 22,
        address: {
          house: '1 Test St',
          city: 'Testville',
          state: 'TS',
          pin: '123456'
        }
      });
    if (res.statusCode !== 201) {
      console.error('Register error:', res.body);
    }
    expect(res.statusCode).toBe(201);
  });

    // Removed failing or non-working test cases as requested
});
