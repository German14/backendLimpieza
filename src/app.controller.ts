import {Body, Controller, Get, HttpCode, Param, Post, Request, UseGuards, Put} from '@nestjs/common';
import {AppService} from './app.service';
import {AuthGuard} from '@nestjs/passport';
import {AuthService} from './auth/auth.service';
import {RegisterEntity} from './users/register.entity';
import {Client} from "./clients/client.entity";

@Controller('api')
export class AppController {
    constructor(private readonly appService: AppService,
                private  readonly authService: AuthService) {}
    response = {};
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.body);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    getProfile(@Request() req) {
        return req.user;
    }

    @Post('register')
    @HttpCode(200)
    async register(@Body() user: RegisterEntity): Promise<any> {
        return  this.authService.register(user).then((value) => {
            return value;
        });
    }

    @Get('auth/email/verify/:email')
    async validation(@Param() param): Promise<any> {
        return this.authService.validateRegister(param.email);
    }

    @Get('configure/:email')
    async userConfigure(@Param() param): Promise<any> {
        return this.authService.configureUser(param.email);
    }

    @Put('configure/:id')
    @UseGuards(AuthGuard('jwt'))
    update(@Body() registerEntity: RegisterEntity) {
        this.authService.updateRegister(registerEntity);
        const response = {
            value: registerEntity,
            result: 'Actualizado',
        };
        return  response;
    }
    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
