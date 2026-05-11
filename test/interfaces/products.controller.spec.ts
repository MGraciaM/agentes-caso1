import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductUseCase } from '../../src/application/use-cases/create-product.use-case';
import { GetProductByIdUseCase } from '../../src/application/use-cases/get-product-by-id.use-case';
import { ListProductsUseCase } from '../../src/application/use-cases/list-products.use-case';
import { ProductNotFoundError } from '../../src/domain/errors/product-not-found.error';
import { ProductsController } from '../../src/interfaces/http/controllers/products.controller';

describe('ProductsController', () => {
  let controller: ProductsController;
  const createProductUseCase = { execute: jest.fn() };
  const getProductByIdUseCase = { execute: jest.fn() };
  const listProductsUseCase = { execute: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        { provide: CreateProductUseCase, useValue: createProductUseCase },
        { provide: GetProductByIdUseCase, useValue: getProductByIdUseCase },
        { provide: ListProductsUseCase, useValue: listProductsUseCase },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    jest.clearAllMocks();
  });

  it('should delegate product creation', async () => {
    const payload = {
      id: 'id-1',
      name: 'Product',
      description: 'Valid description for created product',
      price: 10,
    };
    createProductUseCase.execute.mockResolvedValue(payload);

    await expect(controller.create(payload)).resolves.toEqual(payload);
    expect(createProductUseCase.execute).toHaveBeenCalledWith(payload);
  });

  it('should return not found exception for missing product', async () => {
    getProductByIdUseCase.execute.mockRejectedValue(new ProductNotFoundError('x'));

    await expect(controller.getById('x')).rejects.toThrow(NotFoundException);
  });
});
