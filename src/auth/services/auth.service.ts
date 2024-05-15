import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) { }

  async signup(email: string, password: string) {
    const checkExistsUser = await this.userService.findOneUserByEmail(email);
    if (checkExistsUser.success) {
      return {
        success: false,
        message: 'user is exsits',
      };
    }
    const newUser = await this.userService.createUser(email, password);
    return {
      success: true,
      message: 'wellcom to my website',
      data: newUser
    };
  }


  async login(email: string, password: string) {
    const findUser = await this.userService.findOneUserByEmail(email);
    if (
      !findUser.success ||
      findUser.data.password !== password) {
      return {
        success: false,
        message: 'incorrect email or password'
      };
    }
    return {
      success: true,
      data: findUser.data
    };
  }

  logout() {
    return 'logout service';
  }

  refresh() {
    return 'refresh service';
  }
}
