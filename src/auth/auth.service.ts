import { Injectable } from '@nestjs/common';
import {LoginService} from "../login/login.service";
import { JwtService } from '@nestjs/jwt';
import {UsersService} from "../users/users.service";
import {RegisterEntity} from "../users/register.entity";
import {User} from "../users/user.entity";

@Injectable()
export class AuthService {
    constructor(
        private readonly loginService: LoginService,
        private readonly jwtService: JwtService,
        private readonly userService: UsersService,
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.loginService.findByEmail(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    private async validate(userData: any): Promise<User> {
        return await this.validateUser(userData.username, userData.password);
    }

    public async login(user: User): Promise< any | { status: number }> {
        return this.validate(user).then((userData) => {
            if(!userData){
                return { status: 404 };
            }
            const payload = { username: user['name'], sub: user['userId'] };
            const accessToken = this.jwtService.sign(payload);

            return {
                name: userData['name'],
                avatar: userData['avatar'],
                email:userData['email'] ,
                access_token: accessToken,
            };

        });
    }
    public async register(user: RegisterEntity): Promise<any>{
        return this.userService.create(user)
    }
}
