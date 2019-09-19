import {Controller, Get, Request, Post, UseGuards, UseInterceptors, UploadedFile, HttpCode} from '@nestjs/common';
import { AppService } from './app.service';
import {AuthGuard} from "@nestjs/passport";
import {AuthService} from "./auth/auth.service";
import {FileInterceptor} from '@nestjs/platform-express';

@Controller('api')
export class AppController {

  constructor(private readonly appService: AppService, private  readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req){
    return this.authService.login(req.user);
  }

  @Post('upload')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file) {
    console.log(file);
    return file;
  }


  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
