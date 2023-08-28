import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegistrationDto } from './dto/auth-registration.dto';
import { AuthLogoutDto } from '@modules/auth/dto/auth-logout.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('registration')
  registration(@Body() payload: AuthRegistrationDto) {
    return this.authService.registration(payload);
  }
  @Post('login')
  login(@Body() payload: AuthLoginDto) {
    return this.authService.login(payload);
  }
  @Post('logout')
  logout(@Body() payload: AuthLogoutDto) {
    return this.authService.logout(payload);
  }
}
