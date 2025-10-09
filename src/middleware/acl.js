// Simple ACL middleware for demonstration
// Usage: acl(['admin', 'user'])

module.exports = function(allowedRoles) {
  return function(req, res, next) {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied: insufficient permissions' });
    }
    next();
  };
};
