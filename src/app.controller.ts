import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { join } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('index')
  getHello(@Res() response: Response) {
    response.sendFile(join(__dirname, '../public/readme.html'))
  }

  @Get('404')
  get404(@Res() response: Response) {
    response.sendFile(join(__dirname, '../public/404.html'))
  }

  @Get('/up')
  getAPiStatus() {
    return { data: { status: 'up' }, message: "OK" }
  }
}
