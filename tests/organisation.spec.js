// Organisation specification test
const request = require('supertest');
const app = require('../app');
const { sequelize, User, Organisation } = require('../models');
const { generateToken } = require('../utils/jwtUtils');

describe('Organisation access', () => {
    jest.setTimeout(30000);
  let token;
  let user;

  beforeAll(async () => {
    await sequelize.sync({ force: true });
    user = await User.create({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'password',
      userId: 'test-user-id'
    });
    token = generateToken(user);
    await Organisation.create({
      orgId: 'test-org-id',
      name: "Test's Organisation",
      description: 'Test Organisation'
    });
  });

  it('should not allow users to see organisations they do not belong to', async () => {
    const res = await request(app)
      .get('/api/organisations/another-org-id')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(403);
    expect(res.body.message).toBe('Forbidden');
  });
});
