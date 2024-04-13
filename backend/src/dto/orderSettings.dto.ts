import {
  ArrayMinSize,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class OrderSettingsDto {
  @IsNumber({}, { message: 'orderNum must be a number' })
  @IsNotEmpty({ message: "orderNum must't be empty" })
  orderNum: number;

  @ArrayMinSize(1, { message: 'At least one productCount is required' })
  @IsInt({ each: true, message: 'All productCounts must be numbers' })
  productCount: number[];

  @IsString({ message: 'subject  must be string' })
  @IsOptional()
  @MaxLength(100, { message: 'brand is too long' })
  subject?: string;
}
