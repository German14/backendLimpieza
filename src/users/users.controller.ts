import {Controller, Get, Param, Post, Body, Put, Delete, Options, HttpCode} from '@nestjs/common';
import {UsersService} from './users.service';
import {User} from './user.entity';

@Controller('users')
export class UsersController {
    constructor(private service: UsersService) { }

    @Get(':id')
    get(@Param() params) {
        return this.service.getUser(params.id);
    }
    @Get()
    all() {
        return this.service.getUsers();
    }
    @Post()
    @HttpCode(200)
    create(@Body() user: User) {
        return this.service.createUser(user);
    }
    @Options()
    @HttpCode(204)
    createtwo(@Body() user: User) {
        return this.service.createUser(user);
    }

    @Put(':id')
    update(@Body() user: User) {
        return this.service.updateUser(user);
    }

    @Delete(':id')
    deleteUser(@Param() params) {
        return this.service.deleteUser(params.id);
    }
}
