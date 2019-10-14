import {Body, Controller, Get, HttpCode, Post, Request, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {AppService} from './app.service';
import {AuthGuard} from '@nestjs/passport';
import {AuthService} from './auth/auth.service';
import {FileInterceptor} from '@nestjs/platform-express';
import {diskStorage} from 'multer';
import {Subject} from 'rxjs/internal/Subject';

@Controller('api')
export class AppController {
    constructor(private readonly appService: AppService, private  readonly authService: AuthService) {}
response = {};
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req){
        return this.authService.login(req.user);
    }
   //
   //
   //  @Post('upload')
   //  @HttpCode(200)
   //  @Post()
   //  @UseInterceptors(
   //      FileInterceptor('file', {
   //          storage: diskStorage({
   //              destination: './files',
   //              filename: (req, file, cb) => {
   //                  cb(null, file.originalname);
   //              },
   //          }),
   //      }),
   //  )
   //
   //  uploadedFile(@UploadedFile() file, @Request() req, @Body('file') data) {
   //
   //
   // }

   @UseGuards(AuthGuard('jwt'))
    @Get('me')
    getProfile(@Request() req) {
        return req.user;
    }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
