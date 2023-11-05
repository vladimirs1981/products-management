import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { HashService } from './services/hash.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private hashService: HashService
    ) { }

    async getUserByEmail(email: string) {
        const user = await this.userModel.findOne({
            email
        })
        .exec();
        
        return user;
    }
    
    async createUser(createUserDto: CreateUserDto) {
        const createUser = new this.userModel(createUserDto);

        const existingUser = await this.getUserByEmail(createUser.email);

        if (existingUser) {
            throw new ConflictException(
                'User with provided email address already exists.',
              );
        }

        createUser.password = await this.hashService.hashPassword(createUser.password);

        return createUser.save();
    }
}
