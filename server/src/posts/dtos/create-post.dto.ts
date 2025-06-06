import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsOptional()
  @IsString()
  content: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
