// Auth specification test
const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');

describe('Auth Endpoints', () => {
    jest.setTimeout(30000);
    
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  it('should register user successfully with default organisation', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password',
        phone: '1234567890'
      });

    expect(res.status).toBe(201);
    expect(res.body.status).toBe('success');
    expect(res.body.data.user.firstName).toBe('John');
    expect(res.body.data.user.email).toBe('john@example.com');
    expect(res.body.data.accessToken).toBeDefined();
    expect(res.body.data.user.organisation.name).toBe("John's Organisation");
  });

  it('should log the user in successfully', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'john@example.com',
        password: 'password'
      });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data.user.email).toBe('john@example.com');
    expect(res.body.data.accessToken).toBeDefined();
  });

  it('should fail if required fields are missing', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        lastName: 'Doe',
        email: 'jane@example.com',
        password: 'password',
        phone: '1234567890'
      });

    expect(res.status).toBe(422);
    expect(res.body.errors).toContainEqual({
      field: 'firstName',
      message: 'First name is required'
    });
  });

  it('should fail if there is a duplicate email or userID', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password',
        phone: '1234567890'
      });

    expect(res.status).toBe(422);
    expect(res.body.errors).toContainEqual({
      field: 'email',
      message: 'Email already exists'
    });
  });
});
