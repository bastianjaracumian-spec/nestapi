import { Client } from '../../entities/client/client.js';

export abstract class ClientRepository {
  abstract create(client: Client): Promise<Client>;

  abstract findAll(): Promise<Client[]>;

  abstract findById(id: number): Promise<Client | null>;
}