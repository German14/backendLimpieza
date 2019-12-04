import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import {RegisterEntity} from './register.entity';
import {Client} from "../clients/client.entity";

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>,
                @InjectRepository(RegisterEntity) private registerRepository: Repository<RegisterEntity>) { }

    async getUsers(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    // tslint:disable-next-line:variable-name
    async getUser(_id: number): Promise<User[]> {
        return await this.usersRepository.find({
            select: ['Name', 'Phone', 'Portal', 'Dias' , 'Observations'],
            where: [{ id: _id }],
        });
    }

    async findById(id: string): Promise<any> {
        return await this.usersRepository.find({
            select: ['Name', 'Phone', 'Portal', 'Dias' , 'Observations'],
            where: [{ id: id }],
        });
    }

    async create(user: RegisterEntity) {
        await this.registerRepository.save(user['data']);
    }

    async validateRegister(user: RegisterEntity) {
        const usersUpdate = {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
            email: user.email,
            password: user.password,
            enable: true,
        };
        await this.registerRepository.update(user.id, usersUpdate);
    }

    async getUserConfigure(user: RegisterEntity) {
        return await this.registerRepository.find(
            {
                select: ['id', 'name', 'avatar','email', 'password', 'enable'],
                where: [{ id: user.id }]
            }
        );
    }
    async updateRegister(register: RegisterEntity) {
        const registerUpdate = {
            id: register.id,
            name: register.name,
            avatar: register.avatar,
            email: register.email,
            password: register.password,
            enable: true,
        };
       await this.registerRepository.update(register.id, registerUpdate);
    }


    async createUser(user: User) {
        this.usersRepository.save(user);
    }

    async updateUser(user: User) {
        this.usersRepository.update(user.id, user);

    }

    async deleteUser(user: User) {
        this.usersRepository.delete(user);
    }
}
