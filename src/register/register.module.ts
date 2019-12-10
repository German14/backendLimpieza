import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {RegisterController} from './register.controller';
import {RegisterService} from './register.service';
import {RegisterEntity} from '../users/register.entity';
import {AuthService} from '../auth/auth.service';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {LoginService} from "../login/login.service";
import {AuthModule} from "../auth/auth.module";
import {LoginModule} from "../login/login.module";

@Module({
    imports: [TypeOrmModule.forFeature([RegisterEntity]), AuthModule, LoginModule],
    providers: [RegisterService],
    controllers: [RegisterController],
})

export class RegisterModule { }
