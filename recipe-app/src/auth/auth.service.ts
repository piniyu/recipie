import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserInput } from 'src/users/dto/user-input.dto';
import { LoginResult } from 'src/users/models/login.model';
import { Tokens } from './interfaces/tokens.interface';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtPayload } from './interfaces/jwtPayload.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService) {}

  async signUp(signUpInput: UserInput): Promise<Tokens> {
    // const { email, name, password } = signUpInput
    // const exisingUser = await this.usersService.findOneByEmail(email)
    // if (exisingUser) {
    //   throw new NotAcceptableException('Email already existed ')
    // }

    // const hash = await argon.hash(password);

    const user = await this.usersService
      .create(signUpInput)
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new Error('This email address has been registered.');
          }
        }
        throw error;
      });

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;

  }

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

  async getTokens(userId: string, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('AT_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('RT_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}