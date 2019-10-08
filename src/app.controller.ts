import {Controller, HttpCode, Post, Request, UploadedFile, UseGuards, UseInterceptors, Get} from '@nestjs/common';
import {AppService} from './app.service';
import {AuthGuard} from "@nestjs/passport";
import {AuthService} from "./auth/auth.service";
import {FileInterceptor} from '@nestjs/platform-express';
import {diskStorage} from 'multer'
import { Logger } from '@nestjs/common';
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
  @Post()
  @UseInterceptors(
      FileInterceptor('file', {
        storage: diskStorage({
          destination: './files',
          filename: (req, file, cb) => {

            cb(null, 'hola')
          }
        })
      })
  )
  async uploadedFile(@UploadedFile() file) {
    Logger.log(file)
    const response = {
      filename: file.filename
    };
    return response;
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
