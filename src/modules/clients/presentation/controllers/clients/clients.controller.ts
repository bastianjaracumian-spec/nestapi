import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';

import {
  ApiOperation,
  ApiTags,
  ApiBearerAuth
} from '@nestjs/swagger';

import { CreateClientUseCase } from '../../../application/use-cases/create-client.use-case/create-client.use-case.js';
import { GetClientsUseCase } from '../../../application/use-cases/get-clients.use-case/get-clients.use-case.js';
import { GetClientUseCase } from '../../../application/use-cases/get-client.use-case/get-client.use-case.js';

import { CreateClientDto } from '../../dto/create-client.dto.js';
import { JwtAuthGuard } from '../../../../auth/infrastructure/security/jwt-auth.guard.js';

@ApiTags('Clientes')
@Controller('clients')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ClientsController {
  constructor(
    private readonly createClientUseCase: CreateClientUseCase,
    private readonly getClientsUseCase: GetClientsUseCase,
    private readonly getClientUseCase: GetClientUseCase,
  ) { }

  @Post()
  @ApiOperation({
    summary: 'Crear cliente',
  })
  create(@Body() dto: CreateClientDto) {
    return this.createClientUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los clientes',
  })
  findAll() {
    return this.getClientsUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener cliente por ID',
  })
  findById(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.getClientUseCase.execute(id);
  }
}