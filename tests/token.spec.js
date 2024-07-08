// tests/token.spec.js
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/jwtUtils');

describe('Token generation', () => {
  it('should generate a token with correct expiration and user details', () => {
    const user = {
      userId: 'test-user-id',
      email: 'test@example.com'
    };

    const token = generateToken(user);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    expect(decoded.userId).toBe(user.userId);
    expect(decoded.email).toBe(user.email);
    expect(decoded.exp).toBeGreaterThan(decoded.iat);
  });
});
