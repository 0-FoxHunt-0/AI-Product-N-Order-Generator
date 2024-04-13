import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class OrderDto {
  @IsString({ message: 'imageUrl must be a string' })
  @IsNotEmpty({ message: 'imageUrl must contain a value' })
  @MaxLength(250, { message: 'brand is too long' })
  imageUrl: string;
}
