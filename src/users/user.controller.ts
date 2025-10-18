import { Controller, Post, Body, Get } from '@nestjs/common';

import { User } from './user.entity';
import { UsersService } from './user.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('Users')
@Controller('users')export class UserController {
  constructor(private userService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouvel utilisateur' })
  @ApiResponse({ status: 201, description: 'Utilisateur créé avec succès.' })
  @ApiResponse({ status: 400, description: 'Email déjà existant.' })
   @ApiBody({ type: CreateUserDto })
  async create(@Body() data: Partial<User>): Promise<User> {
    return this.userService.createUser(data);
  }

  @Get()
   @ApiOperation({ summary: 'Lister tous les utilisateurs' })
  @ApiResponse({ status: 200, description: 'Liste des utilisateurs renvoyée avec succès.' })
  @ApiResponse({ status: 403, description: 'Accès interdit (si JWT ou rôle requis)' })
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}
