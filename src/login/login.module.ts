import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from '../users/user.entity';
import {RegisterEntity} from '../users/register.entity';
import {UsersService} from '../users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, RegisterEntity]),
  ],
  providers: [LoginService, UsersService],
  exports: [LoginService],
})
export class LoginModule {}
