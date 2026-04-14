const productController = require('../controllers/products');
const Product = require('../models/products');

describe('Product Controller GET Tests', () => {
  let req, res;
  beforeEach(() => {
    req = { params: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  });

  test('1. getAll should return all products with 200 status', async () => {
    const mockData = [{ brand: 'T9', model: 'Tab' }];
    Product.find = jest.fn().mockResolvedValue(mockData);
    await productController.getAll(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  test('2. getSingle should return a product by ID with 200 status', async () => {
    req.params.id = '65f1a2b3c4d5e6f7a8b9c0d1';
    const mockData = { _id: '65f1a2b3c4d5e6f7a8b9c0d1', model: 'Tab' };
    Product.findById = jest.fn().mockResolvedValue(mockData);
    await productController.getSingle(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('3. getSingle should return 404 if product does not exist', async () => {
    req.params.id = '65f1a2b3c4d5e6f7a8b9c0d1';
    Product.findById = jest.fn().mockResolvedValue(null);
    await productController.getSingle(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  test('4. getSingle should return 500 if database error occurs', async () => {
    req.params.id = 'invalid-id';
    Product.findById = jest.fn().mockRejectedValue(new Error('Database Error'));
    await productController.getSingle(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});