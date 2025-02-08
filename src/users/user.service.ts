import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserByTmdbId(id: number): Promise<User | null> {
    return this.userRepository.getUserByTmdbId(id);
  }

  async save(user: User): Promise<User | null> {
    return this.userRepository.save(user);
  }
}
