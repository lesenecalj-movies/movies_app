import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserRepository {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async getUserByTmdbId(id: number): Promise<User | null> {
    return this.userModel.findOne({ tmdbId: id });
  }

  async save(user: User): Promise<User | null> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }
}
