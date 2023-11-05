import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserSchema = HydratedDocument<User>;

@Schema()
export class User {
    @Prop()
    firstName: string;
  
    @Prop()
    lastName: string;
  
    @Prop({ lowercase: true, unique: true })
    email: string;
  
    @Prop()
    password: string;
  
    @Prop()
    phone: string;
}

export const UserSchema = SchemaFactory.createForClass(User);