import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello() {
    return {
      status: 'OK',
      message: 'API is up and running!',
      timestamp: new Date(),
    };
  }
}
