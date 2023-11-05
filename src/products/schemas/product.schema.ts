import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "src/users/schemas/user.schema";

export type ProductSchema = HydratedDocument<Product>;

@Schema()
export class Product {
    @Prop({ required: true, unique: true })
    name: string;

    @Prop()
    description: string;

    @Prop({ required: true, type: Number, min: 0 })
    price: number;

    @Prop({ required: true })
    quantity: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;
}

export const ProductSchema = SchemaFactory.createForClass(Product);