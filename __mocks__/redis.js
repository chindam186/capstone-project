// Mock for redis client for tests
module.exports.createClient = () => {
  return {
    get: jest.fn((key, cb) => cb(null, null)),
    set: jest.fn((key, value, cb) => cb && cb(null, 'OK')),
    del: jest.fn((key, cb) => cb && cb(null, 1)),
    on: jest.fn(),
    connect: jest.fn(),
    quit: jest.fn()
  };
};
