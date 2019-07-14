import {Entity, Column, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn,ManyToOne,JoinColumn} from "typeorm";
import {Services} from "./Services";
import {Clients} from "./Clients";
@Entity()
export class UserServices {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(type => Services)
    @JoinColumn({ name: "services" })
    services: Services;

    @Column({default: "2000-01-01 00:00:00"})
    dateRegister: Date;

    @Column({default: "2000-01-01 00:00:00"})
    dateExpires: Date;

    @Column({default: "2000-01-01 00:00:00"})
    dateRemind: Date;

    @Column()
    description: string;

    @ManyToOne(type => Clients)
    @JoinColumn({ name: "clients" })
    clients: Clients;

    @Column()
    status: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
  
}