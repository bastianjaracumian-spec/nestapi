import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateClientDto {
  @ApiProperty({ example: '12345678-9' })
  @IsString()
  @IsNotEmpty()
  rut: string;

  @ApiProperty({ example: 'Bastian' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: 'Jara' })
  @IsString()
  @IsNotEmpty()
  apellidoPaterno: string;

  @ApiPropertyOptional({ example: 'Cumian' })
  @IsOptional()
  @IsString()
  apellidoMaterno?: string;

  @ApiProperty({ example: 'bastian@email.com' })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ example: '+56912345678' })
  @IsOptional()
  @IsString()
  telefono?: string;

  @ApiPropertyOptional({ example: '1990-05-15' })
  @IsOptional()
  fechaNacimiento?: Date;

  @ApiPropertyOptional({ example: 'Av. Siempre Viva 123' })
  @IsOptional()
  @IsString()
  direccion?: string;
}