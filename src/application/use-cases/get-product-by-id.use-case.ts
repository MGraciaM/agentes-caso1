import { Inject, Injectable } from '@nestjs/common';
import { ProductNotFoundError } from '../../domain/errors/product-not-found.error';
import {
  PRODUCT_REPOSITORY,
  ProductRepositoryPort,
} from '../../domain/repositories/product.repository.port';
import { ProductDto } from '../dto/product.dto';

@Injectable()
export class GetProductByIdUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepositoryPort,
  ) {}

  async execute(id: string): Promise<ProductDto> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new ProductNotFoundError(id);
    }

    return product.toPrimitives();
  }
}
