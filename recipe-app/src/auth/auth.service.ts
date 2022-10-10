import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
// import { LoginResult, UserInputDto } from 'src/users/dto/user-input.dto';

// @Injectable()
// export class AuthService {
//   constructor(
//     private usersService: UsersService,
//     private jwtService: JwtService) {}

//   async validateUserByPassword(loginAttempt: UserInputDto): Promise<LoginResult | undefined > {
//     const user = await this.usersService.findOneByEmail(loginAttempt.email);
//     if (user) {

//     }
//     if (user && user.password === pass) {
//       const { password, ...result } = user;
//       return result;
//     }
//     return null;
//   }

//   async login(user: any) {
//     const payload = { username: user.username, sub: user.userId };
//     return {
//       access_token: this.jwtService.sign(payload),
//     };
//   }
// }