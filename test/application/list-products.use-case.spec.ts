import { ListProductsUseCase } from '../../src/application/use-cases/list-products.use-case';
import { Product } from '../../src/domain/entities/product.entity';
import { ProductRepositoryPort } from '../../src/domain/repositories/product.repository.port';

describe('ListProductsUseCase', () => {
  it('should return list of products', async () => {
    const products = [
      Product.create({
        id: 'id-1',
        name: 'Product A',
        description: 'Description for product A that is valid',
        price: 12.5,
      }),
      Product.create({
        id: 'id-2',
        name: 'Product B',
        description: 'Description for product B that is valid',
        price: 15,
      }),
    ];

    const repository: ProductRepositoryPort = {
      save: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(async () => products),
    };

    const useCase = new ListProductsUseCase(repository);
    const result = await useCase.execute();

    expect(result).toHaveLength(2);
    expect(result[0].id).toBe('id-1');
  });
});
