import { DomainError } from '../errors/domain-error';

export class ProductDescription {
  private constructor(private readonly value: string) {}

  static create(rawDescription: string): ProductDescription {
    const description = rawDescription?.trim();

    if (!description || description.length < 10 || description.length > 500) {
      throw new DomainError('Product description must have between 10 and 500 characters');
    }

    return new ProductDescription(description);
  }

  getValue(): string {
    return this.value;
  }
}
