import { CreateProductUseCase } from '../../src/application/use-cases/create-product.use-case';
import { ProductRepositoryPort } from '../../src/domain/repositories/product.repository.port';

describe('CreateProductUseCase', () => {
  it('should create and persist a product', async () => {
    const repository: ProductRepositoryPort = {
      save: jest.fn(async () => undefined),
      findById: jest.fn(),
      findAll: jest.fn(),
    };

    const useCase = new CreateProductUseCase(repository);

    const result = await useCase.execute({
      name: 'Product A',
      description: 'Useful product for daily activities',
      price: 100,
    });

    expect(result.id).toBeDefined();
    expect(result.name).toBe('Product A');
    expect(repository.save).toHaveBeenCalledTimes(1);
  });
});
