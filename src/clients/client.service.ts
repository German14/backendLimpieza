import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';

@Injectable()
export class ClientService {

    constructor(@InjectRepository(Client) private clientsRepository: Repository<Client>) { }

    async getClients(): Promise<Client[]> {
        return await this.clientsRepository.find();
    }

    async getClient(ids: number): Promise<Client[]> {
        return await this.clientsRepository.find({
            select: ['Name', 'Phone', 'Tiro', 'Garaje', 'Portal', 'Observations'],
            where: [{id: ids }],
        });
    }

    async createClient(client: Client) {
        this.clientsRepository.save(client);
    }

    async updateClient(client: Client) {
        this.clientsRepository.update(client.id, client);

    }

    async deleteClient(client: Client) {
        this.clientsRepository.delete(client);
    }
}
