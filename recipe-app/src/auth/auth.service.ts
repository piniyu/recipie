import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserInput } from 'src/users/dto/user-input.dto';
import { LoginResult } from 'src/users/models/login.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService) {}

  async login(loginAttempt: UserInput): Promise<LoginResult | undefined > {
    const user = await this.usersService.findOneByEmail(loginAttempt.email)
    if (!user) {
      throw new NotAcceptableException('Could not find the user.')
    }
    const password = user && await this.usersService.getPassword(user.id)
    if (user && password === loginAttempt.password) {
      const payload = { username: user.email, sub: user.id }
      const accessToken = this.jwtService.sign(payload)
      return { user, token: accessToken }
    }
    return undefined;
  }
}