import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {PassportModule} from '@nestjs/passport';
import {LocalStrategy} from './local.strategy';
import {LoginModule} from "../login/login.module";
import {jwtConstants} from "./constans";
import {JwtModule} from '@nestjs/jwt';
import {JwtStrategy} from './jwt.strategy';


@Module({
  imports:[
      LoginModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' }
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
