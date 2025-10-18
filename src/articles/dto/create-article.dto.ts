import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'NestJS Tutorial', description: 'The title of the article' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'NestJS is a progressive Node.js framework...', description: 'The content of the article' })
  content: string;

 
}
