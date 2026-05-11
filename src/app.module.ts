import { Module } from '@nestjs/common';
import { CreateProductUseCase } from './application/use-cases/create-product.use-case';
import { GetProductByIdUseCase } from './application/use-cases/get-product-by-id.use-case';
import { ListProductsUseCase } from './application/use-cases/list-products.use-case';
import { productProviders } from './infrastructure/providers/product.providers';
import { ProductsController } from './interfaces/http/controllers/products.controller';

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [CreateProductUseCase, GetProductByIdUseCase, ListProductsUseCase, ...productProviders],
})
export class AppModule {}
