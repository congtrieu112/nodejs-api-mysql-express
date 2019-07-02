import {Entity, Column, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn} from "typeorm";
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

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
  
}