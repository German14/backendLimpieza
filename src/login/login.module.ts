import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../users/user.entity";
import {RegisterEntity} from "../users/register.entity";

@Module({
  imports:[
    TypeOrmModule.forFeature([User,RegisterEntity])
  ],
  providers: [LoginService],
  exports: [LoginService]
})
export class LoginModule {}
