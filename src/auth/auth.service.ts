import { Injectable } from '@nestjs/common';
import {LoginService} from "../login/login.service";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly loginService: LoginService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.loginService.findOne(username);
        

        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            username: user.username,
            userId: user.userId,
            access_token: this.jwtService.sign(payload),
        };
    }
}
