import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 250 })
    Name: string;

    @Column()
    Phone: string;

    @Column({ length: 500 })
    Portal: string;

    @Column()
    Dias: string;

    @Column({ length: 250 })
    Observations: string;
}
