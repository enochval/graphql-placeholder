import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  root() {
    return { message: this.appService.getHello() }
  }

  @Get('guide')
  @Render('guide')
  guide() {
    return { message: this.appService.getHello() }
  }
}
