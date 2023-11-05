import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    
    @ApiOperation({ summary: 'Register a new user.' })
    @ApiCreatedResponse({ description: 'User created succesfully.' })
    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    registerUser(@Body() registerDto: CreateUserDto) {
        return this.authService.register(registerDto);
    }

    @ApiOperation({ summary: 'Login user.' })
    @ApiCreatedResponse({ description: 'Login succesfull.' })
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
      return this.authService.signIn(signInDto.email, signInDto.password);
    }
}
