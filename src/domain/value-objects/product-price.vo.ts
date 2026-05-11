import { DomainError } from '../errors/domain-error';

export class ProductPrice {
  private constructor(private readonly value: number) {}

  static create(rawPrice: number): ProductPrice {
    if (!Number.isFinite(rawPrice) || rawPrice <= 0) {
      throw new DomainError('Product price must be a number greater than zero');
    }

    const roundedPrice = Number(rawPrice.toFixed(2));
    return new ProductPrice(roundedPrice);
  }

  getValue(): number {
    return this.value;
  }
}
