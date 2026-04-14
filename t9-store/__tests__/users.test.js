const userController = require('../controllers/users');
const User = require('../models/users');

describe('User Controller GET Tests', () => {
  let req, res;
  beforeEach(() => {
    req = { params: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  });

  test('1. getAll should return all users', async () => {
    const mockData = [{ username: 'rudy99' }];
    User.find = jest.fn().mockResolvedValue(mockData);
    await userController.getAll(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('2. getSingle should return one user by ID', async () => {
    req.params.id = '65f1a2b3c4d5e6f7a8b9c0d3';
    const mockData = { _id: '65f1a2b3c4d5e6f7a8b9c0d3', username: 'rudy99' };
    User.findById = jest.fn().mockResolvedValue(mockData);
    await userController.getSingle(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('3. getSingle should return 404 for missing user', async () => {
    User.findById = jest.fn().mockResolvedValue(null);
    await userController.getSingle(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  test('4. getSingle should return 500 for invalid request', async () => {
    User.findById = jest.fn().mockRejectedValue(new Error('Server Error'));
    await userController.getSingle(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});