import { Injectable } from '@nestjs/common';
// import sql from 'mssql/msnodesqlv8.js';
import sql from 'mssql';

import { Client } from '../../../../domain/entities/client/client.js';
import { ClientRepository } from '../../../../domain/repositories/client.repository/client.repository.js';
import { EncryptionService } from '../../../security/encryption.service.js';

@Injectable()
export class SqlClientRepository implements ClientRepository {

  // private readonly config: sql.config = {
  //   server: '(localdb)\\MSSQLLocalDB',
  //   database: 'projectbase',

  //   driver: 'ODBC Driver 18 for SQL Server',

  //   options: {
  //     trustedConnection: true,
  //     trustServerCertificate: true,
  //   },
  // };
  private readonly config: sql.config = {
    server: 'sqlserver',

    database: 'projectbase',

    user: 'sa',

    password: 'Password123!',

    options: {
      trustServerCertificate: true,
    },
  };
  private async getConnection(): Promise<sql.ConnectionPool> {
    const pool = new sql.ConnectionPool(this.config);

    return pool.connect();
  }

  async create(client: Client): Promise<Client> {
    const pool = await this.getConnection();

    try {
      const result = await pool
        .request()
        .input(
          'rut',
          sql.VarChar(255),
          EncryptionService.encrypt(client.rut),
        )
        .input(
          'nombre',
          sql.VarChar(100),
          client.nombre,
        )
        .input(
          'apellidoPaterno',
          sql.VarChar(100),
          client.apellidoPaterno,
        )
        .input(
          'apellidoMaterno',
          sql.VarChar(100),
          client.apellidoMaterno,
        )
        .input(
          'email',
          sql.VarChar(255),
          client.email
            ? EncryptionService.encrypt(client.email)
            : null,
        )
        .input(
          'telefono',
          sql.VarChar(255),
          client.telefono
            ? EncryptionService.encrypt(client.telefono)
            : null,
        )
        .input(
          'fechaNacimiento',
          sql.Date,
          client.fechaNacimiento,
        )
        .input(
          'direccion',
          sql.VarChar(255),
          client.direccion
            ? EncryptionService.encrypt(client.direccion)
            : null,
        )
        .input(
          'activo',
          sql.Bit,
          client.activo,
        )
        .query(`
        INSERT INTO Clientes
        (
          Rut,
          Nombre,
          ApellidoPaterno,
          ApellidoMaterno,
          Email,
          Telefono,
          FechaNacimiento,
          Direccion,
          Activo
        )
        OUTPUT INSERTED.*
        VALUES
        (
          @rut,
          @nombre,
          @apellidoPaterno,
          @apellidoMaterno,
          @email,
          @telefono,
          @fechaNacimiento,
          @direccion,
          @activo
        )
      `);

      return this.toDomain(result.recordset[0]);

    } finally {
      await pool.close();
    }
  }

  async findAll(): Promise<Client[]> {
    const pool = await this.getConnection();

    try {
      const result = await pool
        .request()
        .query(`
          SELECT *
          FROM Clientes
          ORDER BY IdUsuario DESC
        `);

      return result.recordset.map((row) =>
        this.toDomain(row),
      );

    } finally {
      await pool.close();
    }
  }

  async findById(id: number): Promise<Client | null> {
    const pool = await this.getConnection();

    try {
      const result = await pool
        .request()
        .input(
          'idUsuario',
          sql.Int,
          id,
        )
        .query(`
          SELECT *
          FROM Clientes
          WHERE IdUsuario = @idUsuario
        `);

      if (result.recordset.length === 0) {
        return null;
      }

      return this.toDomain(result.recordset[0]);

    } finally {
      await pool.close();
    }
  }

  private toDomain(row: any): Client {
    return new Client(
      row.IdUsuario,
      EncryptionService.decrypt(row.Rut),
      row.Nombre,
      row.ApellidoPaterno,
      row.ApellidoMaterno,
      row.Email ? EncryptionService.decrypt(row.Email) ?? '' : '',
      row.Telefono ? EncryptionService.decrypt(row.Telefono) : null,
      row.FechaNacimiento,
      row.Direccion ? EncryptionService.decrypt(row.Direccion) : null,
      row.Activo,
    );
  }
}

