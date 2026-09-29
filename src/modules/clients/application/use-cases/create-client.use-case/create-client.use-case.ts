import { Injectable } from '@nestjs/common';

import { Client } from '../../../domain/entities/client/client.js';
import { ClientRepository } from '../../../domain/repositories/client.repository/client.repository.js';

export interface CreateClientCommand {
  rut: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno?: string;
  email: string;
  telefono?: string;
  fechaNacimiento?: Date;
  direccion?: string;
}

@Injectable()
export class CreateClientUseCase {
  constructor(
    private readonly clientRepository: ClientRepository,
  ) {}

  async execute(command: CreateClientCommand): Promise<Client> {
    const client = new Client(
      null,
      command.rut,
      command.nombre,
      command.apellidoPaterno,
      command.apellidoMaterno ?? null,
      command.email,
      command.telefono ?? null,
      command.fechaNacimiento ?? null,
      command.direccion ?? null,
      true,
    );

    return this.clientRepository.create(client);
  }
}