import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Client } from '../../../domain/entities/client/client.js';
import { ClientRepository } from '../../../domain/repositories/client.repository/client.repository.js';

@Injectable()
export class GetClientUseCase {
  constructor(
    private readonly clientRepository: ClientRepository,
  ) {}

  async execute(id: number): Promise<Client> {
    const client = await this.clientRepository.findById(id);

    if (!client) {
      throw new NotFoundException(
        `Cliente con ID ${id} no encontrado`,
      );
    }

    return client;
  }
}