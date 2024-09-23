import chai from 'chai';
import supertest from 'supertest';
import app from '../server.js'; 

const { expect } = chai;
const request = supertest(app);

describe('Carts API', () => {
    it('should create a new cart', async () => {
      const newCart = { products: [], totalPrice: 0 };
      const res = await request.post('/carts').send(newCart);
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('id');
      expect(res.body).to.have.property('products');
    });
  
    it('should add a product to the cart', async () => {
      const cartId = 'valid-cart-id';
      const productId = 'valid-product-id';
      const res = await request.post(`/carts/products/${productId}`).send({ quantity: 2 });
      expect(res.status).to.equal(200);
      expect(res.body.products).to.be.an('array');
      expect(res.body.products[0]).to.have.property('productId', productId);
    });
  
    it('should remove a product from the cart', async () => {
      const cartId = 'valid-cart-id';
      const productId = 'valid-product-id';
      const res = await request.delete(`/carts/${cartId}/products/${productId}`);
      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal('Product removed successfully');
    });
  });
  