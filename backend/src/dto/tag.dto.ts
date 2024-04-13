import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class TagDto {
  @IsString({ message: 'color must be a string' })
  @IsNotEmpty({ message: 'color must contain a value' })
  @MaxLength(50, { message: 'brand is too long' })
  color: string;

  @IsString({ message: 'message must be a string' })
  @IsNotEmpty({ message: 'message must contain a value' })
  @MaxLength(50, { message: 'brand is too long' })
  message: string;
}
