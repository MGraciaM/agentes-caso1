import { ProductDescription } from '../value-objects/product-description.vo';
import { ProductName } from '../value-objects/product-name.vo';
import { ProductPrice } from '../value-objects/product-price.vo';

export class Product {
  private constructor(
    private readonly id: string,
    private readonly name: ProductName,
    private readonly description: ProductDescription,
    private readonly price: ProductPrice,
  ) {}

  static create(params: {
    id: string;
    name: string;
    description: string;
    price: number;
  }): Product {
    return new Product(
      params.id,
      ProductName.create(params.name),
      ProductDescription.create(params.description),
      ProductPrice.create(params.price),
    );
  }

  static fromPrimitives(params: {
    id: string;
    name: string;
    description: string;
    price: number;
  }): Product {
    return Product.create(params);
  }

  toPrimitives(): { id: string; name: string; description: string; price: number } {
    return {
      id: this.id,
      name: this.name.getValue(),
      description: this.description.getValue(),
      price: this.price.getValue(),
    };
  }
}
