import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import {RegisterEntity} from './register.entity';

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
