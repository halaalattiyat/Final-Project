import request from 'supertest';
import app from '../server/app';

describe('API Endpoints Integration Tests', () => {
  it('should return 200 for valid /example request', async () => {
    const response = await request(app)
      .post('/api/v1/example?token=abc123')
      .send({ name: 'John', age: 30 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        success: true,
        message: 'Request is valid!',
        data: { name: 'John', age: 30 },
      })
    );
  }, 10000);

  it('should return 400 for missing required fields in /example request', async () => {
    const response = await request(app)
      .post('/api/v1/example?token=abc123')
      .send({});

    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        success: false,
        status: 400,
        message: 'Missing required field: name',
      })
    );
  }, 10000);

  it('should return 400 for invalid data types in /example request', async () => {
    const response = await request(app)
      .post('/api/v1/example?token=abc123')
      .send({ name: 'John', age: 'thirty' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        success: false,
        status: 400,
        message: 'Invalid type for field: age',
      })
    );
  }, 10000);
});