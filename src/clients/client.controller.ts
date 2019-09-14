import {Body, Controller, Delete, Get, HttpCode, Options, Param, Post, Put} from '@nestjs/common';
import {ClientService} from './client.service';
import {Client} from './client.entity';

@Controller('clients')
export class ClientController{
    constructor(private service: ClientService) { }

    @Get(':id')
    get(@Param() params) {
        return this.service.getClient(params.id);
    }
    @Get()
    all() {
        return this.service.getClients();
    }
    @Post()
    @HttpCode(200)
    create(@Body() client: Client) {
        return this.service.createClient(client);
    }
    @Options()
    @HttpCode(204)
    createtwo(@Body() client: Client) {
        return this.service.createClient(client);
    }

    @Put(':id')
    update(@Body() client: Client) {
        return this.service.updateClient(client);
    }

    @Delete(':id')
    deleteUser(@Param() params) {
        return this.service.deleteClient(params.id);
    }
}
