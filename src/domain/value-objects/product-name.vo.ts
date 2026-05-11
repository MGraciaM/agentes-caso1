import { DomainError } from '../errors/domain-error';

export class ProductName {
  private constructor(private readonly value: string) {}

  static create(rawName: string): ProductName {
    const name = rawName?.trim();

    if (!name || name.length < 3 || name.length > 100) {
      throw new DomainError('Product name must have between 3 and 100 characters');
    }

    return new ProductName(name);
  }

  getValue(): string {
    return this.value;
  }
}
