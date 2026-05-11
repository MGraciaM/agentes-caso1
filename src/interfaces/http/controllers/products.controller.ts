import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateProductUseCase } from '../../../application/use-cases/create-product.use-case';
import { GetProductByIdUseCase } from '../../../application/use-cases/get-product-by-id.use-case';
import { ListProductsUseCase } from '../../../application/use-cases/list-products.use-case';
import { ProductNotFoundError } from '../../../domain/errors/product-not-found.error';
import { CreateProductRequestDto } from '../dto/create-product.request.dto';
import { ProductResponseDto } from '../dto/product.response.dto';
import { ProductHttpMapper } from '../mappers/product-http.mapper';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getProductByIdUseCase: GetProductByIdUseCase,
    private readonly listProductsUseCase: ListProductsUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateProductRequestDto): Promise<ProductResponseDto> {
    const created = await this.createProductUseCase.execute(body);
    return ProductHttpMapper.toResponse(created);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<ProductResponseDto> {
    try {
      const found = await this.getProductByIdUseCase.execute(id);
      return ProductHttpMapper.toResponse(found);
    } catch (error) {
      if (error instanceof ProductNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Get()
  async list(): Promise<ProductResponseDto[]> {
    const products = await this.listProductsUseCase.execute();
    return products.map(ProductHttpMapper.toResponse);
  }
}
