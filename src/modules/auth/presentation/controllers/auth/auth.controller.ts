
import {
  Controller,
  Post,
} from '@nestjs/common';
import { AuthService } from '../../../infrastructure/security/auth.service.js';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }
  @Post('login')
  login() {
    return this.authService.login();
  }
}