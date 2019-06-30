import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Clients {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    dateRegister: Date;

    @Column()
    dateExpires: Date;

    @Column()
    description: string;

    @Column()
    author: string;

    @Column()
    status: boolean;

    @Column()
    timestamp: Date;
  
}