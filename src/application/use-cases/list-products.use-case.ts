import { Inject, Injectable } from '@nestjs/common';
import {
  PRODUCT_REPOSITORY,
  ProductRepositoryPort,
} from '../../domain/repositories/product.repository.port';
import { ProductDto } from '../dto/product.dto';

@Injectable()
export class ListProductsUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepositoryPort,
  ) {}

  async execute(): Promise<ProductDto[]> {
    const products = await this.productRepository.findAll();
    return products.map((product) => product.toPrimitives());
  }
}
