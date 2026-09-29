import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './infrastructure/security/auth.service.js';
import { JwtStrategy } from './infrastructure/security/jwt.strategy.js';

import { AuthController } from './presentation/controllers/auth/auth.controller.js';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'mi-clave-super-secreta',
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
  ],
  exports: [
    AuthService,
    JwtModule,
  ],
})
export class AuthModule {}