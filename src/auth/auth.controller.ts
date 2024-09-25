// src/auth/auth.controller.ts
import { Controller, Post, Body, UseGuards, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() userDto: { username: string; password: string; role: string }) {
    return this.usersService.create(userDto.username, userDto.password, userDto.role);
  }

  @Post('login')
  async login(@Body() userDto: { username: string; password: string }) {
    const user = await this.authService.validateUser(userDto.username, userDto.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.authService.login(user);
  }
}
