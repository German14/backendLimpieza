import {Body, Controller, Delete, Get, HttpCode, Options, Param, Post, Put, Request, UseGuards} from '@nestjs/common';
import {UsersService} from './users.service';
import {User} from './user.entity';
import {AuthGuard} from '@nestjs/passport';

@Controller('users')
export class UsersController {
    constructor(private service: UsersService) { }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    get(@Param() params) {
        return this.service.getUser(params.id);
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    all() {
        return this.service.getUsers();
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(200)
    create(@Body() user: User, @Request() req ) {
        this.service.createUser(user);
        const response = {
            value: user,
            result: 'Agregado',
        };
        return  response;
    }

    @Options()
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(204)
    createtwo(@Body() user: User) {
        this.service.createUser(user);
        const response = {
            value: user,
            result: 'Agregado',
        };
        return  response;
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    update(@Body() user: User) {
        this.service.updateUser(user);
        const response = {
            value: user,
            result: 'Actualizado',
        };
        return  response;
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    deleteUser(@Param() params) {
        this.service.deleteUser(params.id);
        const response = {
            value: params,
            result: 'Eliminado',

        };
        return  response;
    }
}
