import { IsNotEmpty, IsString } from 'class-validator';

export class TagDto {
  @IsString()
  @IsNotEmpty()
  color: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
