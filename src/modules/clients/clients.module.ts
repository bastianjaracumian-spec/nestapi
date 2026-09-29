import { Module } from '@nestjs/common';

import { ClientsController } from './presentation/controllers/clients/clients.controller.js';

import { CreateClientUseCase } from './application/use-cases/create-client.use-case/create-client.use-case.js';
import { GetClientsUseCase } from './application/use-cases/get-clients.use-case/get-clients.use-case.js';
import { GetClientUseCase } from './application/use-cases/get-client.use-case/get-client.use-case.js';

import { ClientRepository } from './domain/repositories/client.repository/client.repository.js';

import { SqlClientRepository } from './infrastructure/persistence/sqlserver/repositories/sql-client.repository.js';

@Module({
  imports: [],

  controllers: [
    ClientsController,
  ],

  providers: [
    CreateClientUseCase,
    GetClientsUseCase,
    GetClientUseCase,

    {
      provide: ClientRepository,
      useClass: SqlClientRepository,
    },
  ],
})
export class ClientsModule {}