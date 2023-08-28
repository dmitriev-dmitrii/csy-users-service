import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsEmail, MinLength } from 'class-validator';

export type UserDocument = User & Document;
@Schema()
export class User {
  // inside the class definition
  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role' })
  // role: Role;

  // name: string;
  @Prop()
  login: string;

  @IsEmail({}, { message: 'Email is not valid' })
  email: string;

  @MinLength(10)
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
