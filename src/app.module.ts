import { Module } from '@nestjs/common';

import { ClientsModule } from './modules/clients/clients.module.js';
import { AuthModule } from './modules/auth/auth.module.js';

@Module({
  imports: [
    ClientsModule,
    AuthModule
  ],
})
export class AppModule {}