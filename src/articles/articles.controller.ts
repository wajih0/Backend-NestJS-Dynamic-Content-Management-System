import {
  Controller, Get, Post, Body, Patch, Param, Delete,
  UseGuards, Request
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from 'src/users/user.entity';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse,ApiParam } from '@nestjs/swagger';

@ApiTags('Articles')
@Controller('articles')
@ApiBearerAuth()
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}


  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Créer un nouvel article (ADMIN seulement)' })
  @ApiResponse({ status: 201, description: 'Article créé avec succès.' })
  @ApiResponse({ status: 403, description: 'Accès interdit.' })
  create(@Body() createDto: CreateArticleDto, @Request() req) {
    return this.articlesService.create(createDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Lister tous les articles' })
  @ApiResponse({ status: 200, description: 'Liste des articles renvoyée avec succès.' })
  findAll(@Request() req) {
    const user = req.user;
    return this.articlesService.findAll(user.role);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un article existant (ADMIN seulement)' })
  @ApiParam({ name: 'id', type: Number, description: "ID de l'article à modifier" })
  @ApiResponse({ status: 200, description: 'Article mis à jour avec succès.' })
  @ApiResponse({ status: 404, description: "Article introuvable." })
  update(@Param('id') id: string, @Body() updateDto: UpdateArticleDto) {
    return this.articlesService.update(+id, updateDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un article (ADMIN seulement)' })
  @ApiParam({ name: 'id', type: Number, description: "ID de l'article à supprimer" })
  @ApiResponse({ status: 200, description: 'Article supprimé avec succès.' })
  @ApiResponse({ status: 404, description: "Article introuvable." })
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }
}
