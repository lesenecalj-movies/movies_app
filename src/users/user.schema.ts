import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  tmdbId: number;

  @Prop()
  username: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
