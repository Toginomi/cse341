const roleController = require('../controllers/roles');
const Role = require('../models/roles');

describe('Role Controller GET Tests', () => {
  let req, res;
  beforeEach(() => {
    req = { params: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  });

  test('1. getAll should return all roles', async () => {
    const mockData = [{ roleName: 'Admin' }];
    Role.find = jest.fn().mockResolvedValue(mockData);
    await roleController.getAll(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('2. getSingle should return one role by ID', async () => {
    req.params.id = '65f1a2b3c4d5e6f7a8b9c0d4';
    const mockData = { _id: '65f1a2b3c4d5e6f7a8b9c0d4', roleName: 'Admin' };
    Role.findById = jest.fn().mockResolvedValue(mockData);
    await roleController.getSingle(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('3. getSingle should return 404 if role is missing', async () => {
    Role.findById = jest.fn().mockResolvedValue(null);
    await roleController.getSingle(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  test('4. getSingle should return 500 on database error', async () => {
    Role.findById = jest.fn().mockRejectedValue(new Error('Error'));
    await roleController.getSingle(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});