import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// import { AuthService } from './auth/auth.service';
import { GqlAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  // constructor(private authService: AuthService) {}

  @UseGuards(GqlAuthGuard)
  @Post('auth/login')
  async login(@Request() req: any) {
    return req.user;
  }

  @UseGuards(GqlAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}