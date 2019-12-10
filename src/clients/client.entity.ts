import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Client {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 250 })
    Name: string;

    @Column()
    Phone: string;

    @Column()
    Observations: string;

    @Column()
    Portal: Date;

    @Column()
    Tiro: Date;

    @Column()
    Garaje: Date;
}
