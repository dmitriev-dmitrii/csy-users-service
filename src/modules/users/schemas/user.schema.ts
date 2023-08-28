import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
@Schema()
export class User {
  // inside the class definition
  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role' })
  // role: Role;

  @Prop()
  // name: string;
  @Prop()
  login: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
