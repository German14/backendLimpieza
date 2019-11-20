import {Body, Controller, Get, HttpCode, Post, Request, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {AppService} from './app.service';
import {AuthGuard} from '@nestjs/passport';
import {AuthService} from './auth/auth.service';
import {FileInterceptor} from '@nestjs/platform-express';
import {diskStorage} from 'multer';
import {Subject} from 'rxjs/internal/Subject';
import {RegisterEntity} from "./users/register.entity";

@Controller('api')
export class AppController {
    constructor(private readonly appService: AppService, private  readonly authService: AuthService) {}
response = {};
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req){
        return this.authService.login(req.body);
    }


   @UseGuards(AuthGuard('jwt'))
    @Get('me')
    getProfile(@Request() req) {
        return req.user;
    }

    @Post('register')
    async register(@Body() user: RegisterEntity): Promise<any> {
        return this.authService.register(user);
    }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
