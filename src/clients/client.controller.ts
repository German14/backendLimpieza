import {Body, Controller, Delete, Get, HttpCode, Options, Param, Post, Put, UseGuards} from '@nestjs/common';
import {ClientService} from './client.service';
import {Client} from './client.entity';
import {AuthGuard} from '@nestjs/passport';

@Controller('clients')
export class ClientController {
    constructor(private service: ClientService) { }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    get(@Param() params) {
        return this.service.getClient(params.id);
    }
    @Get()
    @UseGuards(AuthGuard('jwt'))
    all() {
        return this.service.getClients();
    }
    @Post()
    @HttpCode(200)
    @UseGuards(AuthGuard('jwt'))
    create(@Body() client: Client) {
        this.service.createClient(client);
        const response = {
            value: Client,
            result: 'Agregado',
        };
        return  response;
    }
    @Options()
    @HttpCode(204)
    @UseGuards(AuthGuard('jwt'))
    createtwo(@Body() client: Client) {
        return this.service.createClient(client);
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    update(@Body() client: Client) {
        this.service.updateClient(client);
        const response = {
            value: client,
            result: 'Actualizado',
        };
        return  response;
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    deleteUser(@Param() params) {
        this.service.deleteClient(params.id);
        const response = {
            value: params,
            result: 'Eliminado',
        };
        return  response;
    }
}
