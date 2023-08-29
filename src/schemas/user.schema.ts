import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsEmail, MinLength } from 'class-validator';

export type UserDocument = User & Document;
@Schema({ versionKey: false, collection: 'users' })
export class User {
  constructor(payload) {
    this.created = new Date();
    this.email = payload.email;
    this.password = payload.password;
  }
  // inside the class definition
  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role' })
  // role: Role;

  created: Date;
  // name: string;
  // @Prop()
  // login: string;

  @Prop()
  @IsEmail({}, { message: 'email is not valid' })
  email: string;

  @Prop()
  @MinLength(10)
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
