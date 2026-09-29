import { Injectable } from '@nestjs/common';

import { Client } from '../../../domain/entities/client/client.js';
import { ClientRepository } from '../../../domain/repositories/client.repository/client.repository.js';

@Injectable()
export class GetClientsUseCase {
  constructor(
    private readonly clientRepository: ClientRepository,
  ) {}

  async execute(): Promise<Client[]> {
    return this.clientRepository.findAll();
  }
}