import { validateRequest } from '../server/adapters/middleware/validationMiddleware';
import { AppError } from '../server/adapters/middleware/errorMiddleware';

describe('Validation Middleware', () => {
  const mockRequest = (body = {}, query = {}) => ({ body, query });
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  const mockNext = jest.fn();

  it('should pass validation for valid request', () => {
    const schema = {
      body: {
        name: { type: 'string', required: true },
        age: { type: 'number', required: true, min: 0 },
      },
      query: {
        token: { type: 'string', required: true },
      },
    };

    const req = mockRequest({ name: 'John', age: 30 }, { token: 'abc123' });
    const res = mockResponse();

    validateRequest(schema)(req, res, mockNext);

    expect(mockNext).toHaveBeenCalled();
  });

  it('should fail validation for missing required fields', () => {
    const schema = {
      body: {
        name: { type: 'string', required: true },
        age: { type: 'number', required: true, min: 0 },
      },
      query: {
        token: { type: 'string', required: true },
      },
    };

    const req = mockRequest({}, {});
    const res = mockResponse();

    validateRequest(schema)(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        status: 400,
        message: 'Missing required field: name',
      })
    );
  });

  it('should fail validation for invalid data types', () => {
    const schema = {
      body: {
        name: { type: 'string', required: true },
        age: { type: 'number', required: true, min: 0 },
      },
      query: {
        token: { type: 'string', required: true },
      },
    };

    const req = mockRequest({ name: 'John', age: 'thirty' }, { token: 123 });
    const res = mockResponse();

    validateRequest(schema)(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        status: 400,
        message: 'Invalid type for field: age',
      })
    );
  });
});