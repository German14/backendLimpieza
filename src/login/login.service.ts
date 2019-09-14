import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class LoginService {
    private readonly users: User[];

    constructor() {
        this.users = [
            {
                userId: 1,
                username: 'Graciela',
                password: 'test',
            },
            {
                userId: 2,
                username: 'german',
                password: 'test',
            }
        ];
    }

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }
}
