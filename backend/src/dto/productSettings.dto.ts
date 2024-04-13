import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class ProductSettingsDto {
  @IsNotEmpty({ message: 'At least one productCount is required' })
  @IsInt({ each: true, message: 'All productCounts must be numbers' })
  productCount: number;

  @IsString({ message: 'subject  must be string' })
  @IsOptional()
  @MaxLength(250, { message: 'brand is too long' })
  subject?: string;
}
