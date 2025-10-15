let isTest = process.env.NODE_ENV === 'test';
let middleware;
if (isTest) {
  // No-op middleware for tests
  middleware = () => (req, res, next) => next();
} else {
  const redis = require('redis');
  const client = redis.createClient();
  client.connect();
  middleware = (keyPrefix) => async (req, res, next) => {
    const key = keyPrefix + ':' + (req.originalUrl || req.url);
    try {
      const cached = await client.get(key);
      if (cached) {
        return res.json(JSON.parse(cached));
      }
      res.sendResponse = res.json;
      res.json = (body) => {
        client.setEx(key, 60, JSON.stringify(body)); // cache for 60 seconds
        res.sendResponse(body);
      };
      next();
    } catch (err) {
      next();
    }
  };
}
module.exports = middleware;
