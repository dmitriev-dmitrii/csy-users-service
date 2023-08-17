// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import mongoose, { HydratedDocument } from 'mongoose';
// import { IsEmail, IsString, MinLength } from 'class-validator';
//
// export type UserDocument = HydratedDocument<User>;
//
// @Schema()
// export class User {
//   // inside the class definition
//   // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role' })
//   // role: Role;
//
//   @Prop()
//   name: string;
//
//   @Prop()
//   login: string;
//
//   @Prop({ required: true })
//   email: string;
//
//   @Prop()
//   password: string;
// }

import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  login: String,
  name: String,
  email: Number,
  password: String,
});
