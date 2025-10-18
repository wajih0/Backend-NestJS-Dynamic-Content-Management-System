


import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Article } from '../articles/article.entity';
import * as bcrypt from 'bcrypt';

export enum UserRole {
USER = 'USER',
ADMIN = 'ADMIN',
}

@Entity()
export class User {
@PrimaryGeneratedColumn()
id: number;

@Column({ unique: true })
email: string;

@Column()
password: string;

@Column({
type: 'enum',
enum: UserRole,
default: UserRole.USER,
})
role: UserRole;

@Column({ type: 'text', nullable: true })
refreshToken: string | null;  

@CreateDateColumn()
createdAt: Date;

@OneToMany(() => Article, (article) => article.author)
articles: Article[];

  // Méthode pour hasher le password
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
