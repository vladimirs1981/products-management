import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        MONGO_CONNECTION_URI: Joi.string().required(),
        PORT: Joi.number().required().default(3000),
        SECRET: Joi.string().required()
      }),
      isGlobal: true,
      envFilePath: '.env',

    }),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_URI), ProductsModule, AuthModule, UsersModule],
})
export class AppModule {}
