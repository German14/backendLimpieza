import {Body, Controller, Get, HttpCode, Param, Post, Put, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {RegisterEntity} from '../users/register.entity';
import {AuthService} from '../auth/auth.service';

@Controller('registrar')
export class RegisterController {
    constructor(private  readonly authService: AuthService) {}

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
  
}
