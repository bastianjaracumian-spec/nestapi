import { Injectable } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!'; 
  }
}
