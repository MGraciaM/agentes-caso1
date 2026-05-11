import { IsNotEmpty, IsNumber, IsString, MaxLength, Min, MinLength } from 'class-validator';

export class CreateProductRequestDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  name!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(500)
  description!: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  price!: number;
}
