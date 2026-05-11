import { DomainError } from '../../src/domain/errors/domain-error';
import { Product } from '../../src/domain/entities/product.entity';

describe('Product Entity', () => {
  it('should create a valid product', () => {
    const product = Product.create({
      id: 'product-1',
      name: 'Mechanical Keyboard',
      description: 'Compact mechanical keyboard with RGB lighting',
      price: 89.99,
    });

    expect(product.toPrimitives()).toEqual({
      id: 'product-1',
      name: 'Mechanical Keyboard',
      description: 'Compact mechanical keyboard with RGB lighting',
      price: 89.99,
    });
  });

  it('should throw when price is invalid', () => {
    expect(() =>
      Product.create({
        id: 'product-2',
        name: 'Mouse',
        description: 'Gaming mouse with customizable buttons',
        price: 0,
      }),
    ).toThrow(DomainError);
  });
});
