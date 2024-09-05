import chai from 'chai';
import supertest from 'supertest';
import app from '../server.js'; 

const { expect } = chai;
const request = supertest(app);

describe('Products API', () => {
  it('should fetch all products', async () => {
    const res = await request.get('/products');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.above(0);
  });

  it('should return a specific product by ID', async () => {
    const productId = 'some-product-id'; 
    const res = await request.get(`/products/${productId}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('id', productId);
    expect(res.body).to.have.property('name');
    expect(res.body).to.have.property('price');
  });

  it('should return 404 for a non-existing product', async () => {
    const res = await request.get('/products/non-existing-id');
    expect(res.status).to.equal(404);
    expect(res.body.message).to.equal('Product not found');
  });
});
