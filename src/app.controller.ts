import {Controller, Post, Request, UseGuards} from '@nestjs/common';
import {AppService} from './app.service';
import {AuthGuard} from '@nestjs/passport';
import {AuthService} from './auth/auth.service';

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
}
