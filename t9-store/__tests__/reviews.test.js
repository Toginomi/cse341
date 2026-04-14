const reviewController = require('../controllers/reviews');
const Review = require('../models/reviews');

describe('Review Controller GET Tests', () => {
  let req, res;
  beforeEach(() => {
    req = { params: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  });

  test('1. getAll should return all reviews with 200 status', async () => {
    const mockData = [{ comment: 'Great product' }];
    Review.find = jest.fn().mockResolvedValue(mockData);
    await reviewController.getAll(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('2. getSingle should return a review by ID with 200 status', async () => {
    req.params.id = '65f1a2b3c4d5e6f7a8b9c0d2';
    const mockData = { _id: '65f1a2b3c4d5e6f7a8b9c0d2', comment: 'Great product' };
    Review.findById = jest.fn().mockResolvedValue(mockData);
    await reviewController.getSingle(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('3. getSingle should return 404 if review not found', async () => {
    req.params.id = '65f1a2b3c4d5e6f7a8b9c0d2';
    Review.findById = jest.fn().mockResolvedValue(null);
    await reviewController.getSingle(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  test('4. getSingle should return 500 on server error', async () => {
    Review.findById = jest.fn().mockRejectedValue(new Error('Internal Error'));
    await reviewController.getSingle(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});