import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService
  ) { }

  /**
   * 
   * @param email 
   * @param password 
   * @returns 
   */
  async signup(email: string, password: string) {
    const checkExistsUser = await this.userService.findOneUserByEmail(email);
    if (checkExistsUser.success) {
      return {
        success: false,
        message: 'user is exsits',
      };
    }
    let newUser = await this.userService.createUser(email, password);
    return {
      success: true,
      message: 'wellcom to my website',
      data: {
        ...newUser.data,
        token: this.jwtService.sign(newUser.data, {
          secret: this.configService.get<string>('JWT_SECRET_KEY')
        })
      }
    };
  }

  /**
   * 
   * @param email 
   * @param password 
   * @returns 
   */
  async login(email: string, password: string) {
    const findUser = await this.userService.findOneUserByEmail(email);
    if (
      !findUser.success ||
      !(await bcrypt.compare(password, findUser.data.password))
    ) {
      return {
        success: false,
        message: 'incorrect email or password',
      };
    }
    return {
      success: true,
      data: await this.jwtService.signAsync({
        id: findUser.data.id,
        email: findUser.data.email,
        createdAt: findUser.data.createdAt,
        updatedAt: findUser.data.updatedAt,
      }, {
        secret: this.configService.get<string>('JWT_SECRET_KEY'),
      })
    };
  }

  logout() {
    return 'logout service';
  }

  refresh() {
    return 'refresh service';
  }
}
