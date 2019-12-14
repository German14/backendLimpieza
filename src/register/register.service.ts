import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {RegisterEntity} from '../users/register.entity';

@Injectable()
export class RegisterService {

    constructor(@InjectRepository(RegisterEntity) private registerRepository: Repository<RegisterEntity>) { }

    async create(user: RegisterEntity) {
        await this.registerRepository.save(user['data']);
    }

    async validateRegister(users: any) {
        const user = await this.registerRepository.findOne({ email: users});
        const usersUpdate: { password: string; enable: boolean; name: string; id: number; avatar: string; email: string } = {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
            email: user.email,
            password: user.password,
            enable: true,
        };
        await this.registerRepository.update(user.id, usersUpdate);
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
}
