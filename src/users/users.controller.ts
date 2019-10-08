import {Controller, Get, Param, Post, Body, Put, Delete, Options, HttpCode, UseGuards} from '@nestjs/common';
import {UsersService} from './users.service';
import {User} from './user.entity';
import {AuthGuard} from "@nestjs/passport";

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
    create(@Body() user: User) {
        return this.service.createUser(user);
    }
    @Options()
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(204)
    createtwo(@Body() user: User) {
        return this.service.createUser(user);
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    update(@Body() user: User) {
        return this.service.updateUser(user);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    deleteUser(@Param() params) {
        return this.service.deleteUser(params.id);
    }
}
