import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { HashService } from 'src/users/services/hash.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private hashService: HashService
    ) { }

    async register(data: CreateUserDto) {
        const user = await this.usersService.createUser(data);

        const payload = { sub: user.id, email: user.email };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };

    }

    async signIn(email: string, password: string) {
        const user = await this.usersService.getUserByEmail(email);

        if (!user) {
            throw new NotFoundException(
                'User not found',
              );
        }

        if (await !this.hashService.comparePassword(password, user.password)) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user._id, email: user.email };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };

    } 


    

}
