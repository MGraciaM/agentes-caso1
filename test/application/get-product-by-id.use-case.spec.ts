import { GetProductByIdUseCase } from '../../src/application/use-cases/get-product-by-id.use-case';
import { ProductNotFoundError } from '../../src/domain/errors/product-not-found.error';
import { Product } from '../../src/domain/entities/product.entity';
import { ProductRepositoryPort } from '../../src/domain/repositories/product.repository.port';

describe('GetProductByIdUseCase', () => {
  it('should return a product when it exists', async () => {
    const product = Product.create({
      id: 'id-1',
      name: 'Monitor 4K',
      description: 'High definition 4K monitor for professionals',
      price: 300,
    });

    const repository: ProductRepositoryPort = {
      save: jest.fn(),
      findById: jest.fn(async () => product),
      findAll: jest.fn(),
    };

    const useCase = new GetProductByIdUseCase(repository);

    await expect(useCase.execute('id-1')).resolves.toEqual(product.toPrimitives());
  });

  it('should throw ProductNotFoundError when product does not exist', async () => {
    const repository: ProductRepositoryPort = {
      save: jest.fn(),
      findById: jest.fn(async () => null),
      findAll: jest.fn(),
    };

    const useCase = new GetProductByIdUseCase(repository);

    await expect(useCase.execute('missing-id')).rejects.toThrow(ProductNotFoundError);
  });
});
