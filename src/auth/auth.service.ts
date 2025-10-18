import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // Register
  async register(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    await user.hashPassword();

    try {
      return await this.userRepository.save(user);
    } catch (error) {
      // Vérifie si c'est une erreur de "duplicate key" sur email
      if (error.code === '23505') { 
        throw new BadRequestException('Email already exists');
      }
      throw new InternalServerErrorException();
    }
  }

  // Login
  async login(loginDto: LoginUserDto) {
    const user = await this.userRepository.findOne({ where: { email: loginDto.email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const passwordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!passwordValid) throw new UnauthorizedException('Invalid credentials');

    // Générer tokens
    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET, expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '7d' });

    // Hash refresh token et sauvegarde
    user.refreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userRepository.save(user);

    return { accessToken, refreshToken };
  }

  // Refresh token
  async refresh(userId: number, refreshToken: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user || !user.refreshToken) throw new UnauthorizedException('Invalid refresh token');

    const valid = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!valid) throw new UnauthorizedException('Invalid refresh token');

    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET, expiresIn: '15m' });

    return { accessToken };
  }

  // Logout
  async logout(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('User not found');

    user.refreshToken = null;
    await this.userRepository.save(user);
    return { message: 'Logged out successfully' };
  }
}
