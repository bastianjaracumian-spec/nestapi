import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Clientes')
export class ClientOrmEntity {
  @PrimaryGeneratedColumn({
    name: 'IdUsuario',
  })
  idUsuario: number;

  @Column({
    name: 'Rut',
    type: 'varchar',
    length: 12,
  })
  rut: string;

  @Column({
    name: 'Nombre',
    type: 'varchar',
    length: 100,
  })
  nombre: string;

  @Column({
    name: 'ApellidoPaterno',
    type: 'varchar',
    length: 100,
  })
  apellidoPaterno: string;

  @Column({
    name: 'ApellidoMaterno',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  apellidoMaterno: string | null;

  @Column({
    name: 'Email',
    type: 'varchar',
    length: 150,
  })
  email: string;

  @Column({
    name: 'Telefono',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  telefono: string | null;

  @Column({
    name: 'FechaNacimiento',
    type: 'date',
    nullable: true,
  })
  fechaNacimiento: Date | null;

  @Column({
    name: 'Direccion',
    type: 'varchar',
    length: 250,
    nullable: true,
  })
  direccion: string | null;

  @Column({
    name: 'Activo',
    type: 'bit',
    default: true,
  })
  activo: boolean;
}