import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {PassportModule} from '@nestjs/passport';
import {LocalStrategy} from './local.strategy';
import {LoginModule} from "../login/login.module";
import {jwtConstants} from "./constans";
import {JwtModule} from '@nestjs/jwt';
import {JwtStrategy} from './jwt.strategy';
import {RegisterEntity} from "../users/register.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersService} from "../users/users.service";
import {User} from "../users/user.entity";


@Module({
  imports:[
    LoginModule,
    TypeOrmModule.forFeature([User,RegisterEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' }
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, UsersService],
  exports: [AuthService]
})
export class AuthModule {}
