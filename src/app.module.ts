import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UsersModule} from './users/users.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ClientModule} from './clients/client.module';
import {AuthModule} from './auth/auth.module';
import {LoginModule} from './login/login.module';
import {RegisterModule} from './register/register.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: '192.168.0.12',
      port: 3306,
      username: 'garisto',
      password: 'independiente',
      database: 'users',
      entities: ['src/**/**.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    ClientModule,
    AuthModule,
    LoginModule,
    RegisterModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
