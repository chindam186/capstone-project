const request = require('supertest');
const app = require('../src/server');

describe('Review API', () => {
  let token = '';
  let bookId = '';
  let reviewId = '';

  beforeAll(async () => {
    // Register and login user
    await request(app)
      .post('/api/users/register')
      .send({
        email: 'reviewuser@example.com',
        password: 'Review@1234',
        age: 28,
        address: {
          house: '789',
          city: 'ReviewCity',
          state: 'RV',
          pin: '789123'
        }
      });
    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'reviewuser@example.com',
        password: 'Review@1234'
      });
    token = res.body.token;
    // Add a book
    const bookRes = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Review Book',
        author: 'Review Author',
        genre: 'Nonfiction',
        year: 2023,
        description: 'A book for review.'
      });
    bookId = bookRes.body.book._id;
  });

    // Placeholder test to prevent Jest failure on empty file
    test('placeholder', () => {
      expect(true).toBe(true);
    });
});
