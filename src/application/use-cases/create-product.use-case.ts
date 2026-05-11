import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateProductCommand } from '../dto/create-product.command';
import { ProductDto } from '../dto/product.dto';
import { Product } from '../../domain/entities/product.entity';
import {
  PRODUCT_REPOSITORY,
  ProductRepositoryPort,
} from '../../domain/repositories/product.repository.port';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepositoryPort,
  ) {}

  async execute(command: CreateProductCommand): Promise<ProductDto> {
    const product = Product.create({
      id: randomUUID(),
      name: command.name,
      description: command.description,
      price: command.price,
    });

    await this.productRepository.save(product);

    return product.toPrimitives();
  }
}
