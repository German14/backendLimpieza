import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

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
