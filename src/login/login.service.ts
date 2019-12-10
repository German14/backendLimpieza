import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {RegisterEntity} from '../users/register.entity';
import {Repository} from 'typeorm';
import {default as config} from '../config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class LoginService {
    @InjectRepository(RegisterEntity) private usersRepository: Repository<RegisterEntity>;
    constructor() {}

    async findByEmail(email: string): Promise<any> {
        return this.usersRepository.findOne({email });
    }

    async sendEmailVerification(email: RegisterEntity): Promise<boolean> {
        const model = await this.usersRepository.findOne({ email: email.email});
        if (!model) {
            const transporter = nodemailer.createTransport({
                host: config.mail.host,
                port: config.mail.port,
                secure: config.mail.secure, // true for 465, false for other ports
                auth: {
                    user: config.mail.user,
                    pass: config.mail.pass,
                },
            });

            const mailOptions = {
                from: 'Company GMG APPS',
                to: email.email, // list of receivers (separated by ,)
                subject: 'Verify Email',
                text: 'Verify Email',
                html: 'Buenas Días <br><br> Gracias por registrarse a la aplicación<br><br>' +
                '<a href=' + config.host.url + ':' + config.host.port + '/auth/email/verify/' + email.email + '>' +
                    'Click aqui para activar la cuenta' +
                    '</a>',
            };

            const sent = await new Promise<boolean>(async function(resolve, reject) {
                return await transporter.sendMail(mailOptions, async (error, info) => {
                    if (error) {
                        return resolve(false);
                    }
                    resolve(true);
                });
            });
            return sent;
        } else {
            throw new HttpException('REGISTER.USER_NOT_REGISTERED', HttpStatus.FORBIDDEN);
        }
    }

}
