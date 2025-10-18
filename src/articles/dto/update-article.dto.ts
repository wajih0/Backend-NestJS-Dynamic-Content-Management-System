import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateArticleDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Titre de l’article' })
  title?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Contenu de l’article' })
  content?: string;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({ description: 'Statut de publication (true/false)', default: false })
  isPublished?: boolean;
}
