import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service.js';
import { ApiTags, ApiOperation } from '@nestjs/swagger';


@ApiTags('Usuarios')
@Controller('Users')
export class AppController {
  constructor(private readonly appService: AppService) {}

 @Get('ObtenerUsuario')
  @ApiOperation({ summary: 'Obtener usuarios' })
  findAll() {
    return [
      {
        id: 1,
        name: 'Bastian',
      },
    ];
  }

  @Post('CrearUsuario')
  @ApiOperation({ summary: 'Crear usuario' })
  create(@Body() body: any) {
    return body;
  }
}
