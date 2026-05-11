import { ProductDto } from '../../../application/dto/product.dto';
import { ProductResponseDto } from '../dto/product.response.dto';

export class ProductHttpMapper {
  static toResponse(dto: ProductDto): ProductResponseDto {
    return {
      id: dto.id,
      name: dto.name,
      description: dto.description,
      price: dto.price,
    };
  }
}
