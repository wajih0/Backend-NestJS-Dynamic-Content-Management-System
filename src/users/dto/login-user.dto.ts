import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  
  @ApiProperty({  description: 'Email de l’utilisateur' })
  @IsEmail()
  email: string;

  @ApiProperty({  description: 'Mot de passe (minimum 6 caractères)' })
  @IsString()
  @MinLength(6)
  password: string;
}
