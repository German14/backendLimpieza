import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './user.entity';
import {RegisterEntity} from "./register.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, RegisterEntity])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
