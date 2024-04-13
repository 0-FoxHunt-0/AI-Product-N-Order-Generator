import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class ProductDto {
  @IsString({ message: 'name must be a string' })
  @IsNotEmpty({ message: 'name must contain a value' })
  @MaxLength(50, { message: 'name is too long' })
  name: string;

  @IsInt({ each: true, message: 'count must be a number' })
  @IsNotEmpty({ message: 'count must contain a value' })
  count: number;

  @IsNumber({}, { message: 'price must be a number' })
  @IsNotEmpty({ message: 'price must contain a value' })
  price: number;

  @IsNumber({}, { message: 'providerPrice must be a number' })
  @IsNotEmpty({ message: 'providerPrice must contain a value' })
  providerPrice: number;

  @IsString({ message: 'brand must be a string' })
  @IsNotEmpty({ message: 'brand must contain a value' })
  @MaxLength(50, { message: 'brand is too long' })
  brand: string;

  @IsString({ message: 'notes must be a string' })
  @IsOptional()
  @MaxLength(250, { message: 'brand is too long' })
  notes?: string;

  @IsString({ message: 'imageUrl must be a string' })
  @IsOptional()
  @MaxLength(250, { message: 'brand is too long' })
  imageUrl?: string;
}
