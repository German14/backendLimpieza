import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class RegisterEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: 'I tied with a lot of type and more  value'})
    name: string;

    @Column({default: 'I tied with a lot of type and more  value'})
    avatar: string;

    @Column({default: 'I tied with a lot of type and more  value', length: 500 })
    email: string;

    @Column({default: 'I tied with a lot of type and more  value'})
    password: string;

    @Column({default: false})
    enable: boolean;

}
