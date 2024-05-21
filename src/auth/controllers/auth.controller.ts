import { Body, ConflictException, Controller, InternalServerErrorException, Post, Res, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './../services/auth.service';
import { loginDTO, signupDTO } from '../dto/auth.dto';
import { Response } from 'express';
import { COOKIE_NAMES } from '../enums/auth.enums';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @Post('/login')
  async loging(@Body() body: loginDTO, @Res({ passthrough: true }) res: Response) {
    try {
      const getUserLogin = await this.authService.login(body.email, body.password);
      if (getUserLogin.success) {
        res.cookie(COOKIE_NAMES.TOKEN, getUserLogin.data);
        return getUserLogin;
      }
      return new UnauthorizedException();
    } catch (err: unknown) {
      return new InternalServerErrorException();
    }

  }


  @Post('/signup')
  async signup(@Body() body: signupDTO, @Res({ passthrough: true }) res: Response) {
    try {
      const createNewUser = await this.authService.signup(body.email, body.password);
      if (!createNewUser.success) {
        return new ConflictException();
      }
      res.cookie(COOKIE_NAMES.TOKEN, createNewUser.data);
      return createNewUser;
    } catch (err: unknown) {
      throw new InternalServerErrorException();
    }
  }


  @Post('/logout')
  logout() {
    return 'logout';
  }


  @Post('/refresh')
  refresh() {
    return 'refresh';
  }
}
