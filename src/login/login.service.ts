import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {RegisterEntity} from "../users/register.entity";
import {Repository} from "typeorm";
export type Users = any;

@Injectable()
export class LoginService {
    @InjectRepository(RegisterEntity) private usersRepository: Repository<RegisterEntity>;
    constructor() {
     }

    async findByEmail(email: string): Promise<any> {
        return this.usersRepository.findOne({ email: email });
    }

}
