import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

   async createUser(data: Partial<User>): Promise<User> {
    const user = this.userRepository.create(data);
    await user.hashPassword();
    return this.userRepository.save(user);
  }

   async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    return this.userRepository.update(userId, { refreshToken });
  }
}
