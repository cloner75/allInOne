import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './../services/auth.service';
import { loginBody, signupBody } from './../interfaces/auth.interface';
import { loginDTO, signupDTO } from '../dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @Post('/login')
  async loging(@Body() body: loginDTO) {
    const createNewUser = await this.authService.login(body.email, body.password);
    return createNewUser;
  }


  @Post('/signup')
  async signup(@Body() body: signupDTO) {
    const createNewUser = await this.authService.signup(body.email, body.password);
    return createNewUser;
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
