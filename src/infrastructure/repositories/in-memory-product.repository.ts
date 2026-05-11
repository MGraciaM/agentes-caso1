import { Injectable } from '@nestjs/common';
import { Product } from '../../domain/entities/product.entity';
import { ProductRepositoryPort } from '../../domain/repositories/product.repository.port';

@Injectable()
export class InMemoryProductRepository implements ProductRepositoryPort {
  private readonly products = new Map<string, Product>();

  async save(product: Product): Promise<void> {
    this.products.set(product.toPrimitives().id, product);
  }

  async findById(id: string): Promise<Product | null> {
    return this.products.get(id) ?? null;
  }

  async findAll(): Promise<Product[]> {
    return [...this.products.values()];
  }
}
