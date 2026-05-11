import { Provider } from '@nestjs/common';
import { PRODUCT_REPOSITORY } from '../../domain/repositories/product.repository.port';
import { InMemoryProductRepository } from '../repositories/in-memory-product.repository';

export const productProviders: Provider[] = [
  {
    provide: PRODUCT_REPOSITORY,
    useClass: InMemoryProductRepository,
  },
];
