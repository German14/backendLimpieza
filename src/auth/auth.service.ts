import {Injectable} from '@nestjs/common';
import {LoginService} from '../login/login.service';
import {JwtService} from '@nestjs/jwt';
import {UsersService} from '../users/users.service';
import {RegisterEntity} from '../users/register.entity';
import {User} from '../users/user.entity';

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
            if (!userData) {
                return { status: 404 };
            }
            const payload = { username: userData['name'],lastname: userData['avatar'] , email: userData['email'] };
            const accessToken = this.jwtService.sign({payload});

            return {
                name: userData['name'],
                avatar: userData['avatar'],
                email: userData['email'] ,
                access_token: accessToken,
                enable: userData['enable'],
            };

        });
    }

    public async validateRegister(user: string): Promise<any> {
        const users = await this.loginService.findByEmail(user);
        this.userService.validateRegister(users);
        const response = {
            value: users.name,
            result: 'Actualizado',
        };
        return  response;
    }

    public async configureUser(user: string): Promise<any> {
        const users = await this.loginService.findByEmail(user);
      return  this.userService.getUserConfigure(users)
    }

    public async updateRegister(register: RegisterEntity): Promise<any> {
        return  this.userService.updateRegister(register)
    }

    public async register(user: RegisterEntity): Promise<any> {
        return this.loginService.sendEmailVerification(user['data']).then((value) => {
            if (value) {
                this.userService.create(user);
                const validate = {
                    value,
                    result: 'Se ha registrado',
                };
                return  validate;

            } else {
                const response = {
                    value,
                    result: 'No se ha registrado',
                };
                return  response;
            }
        });
    }
}
