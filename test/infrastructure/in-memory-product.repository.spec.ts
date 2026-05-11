import { Product } from '../../src/domain/entities/product.entity';
import { InMemoryProductRepository } from '../../src/infrastructure/repositories/in-memory-product.repository';

describe('InMemoryProductRepository', () => {
  it('should save and retrieve products', async () => {
    const repository = new InMemoryProductRepository();
    const product = Product.create({
      id: 'id-1',
      name: 'USB Hub',
      description: 'USB hub with multiple high-speed ports',
      price: 29.99,
    });

    await repository.save(product);

    await expect(repository.findById('id-1')).resolves.toEqual(product);
    await expect(repository.findAll()).resolves.toHaveLength(1);
  });
});
