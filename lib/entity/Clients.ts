import {Unique,Entity, Column, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn} from "typeorm";
@Entity()
@Unique(["email","phone","username"])
export class Clients {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullname: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column({select: false})
    password: string;

    @Column()
    phone: string;

    @Column({default: "2000-01-01",type:"date"})
    birthday: Date;

    @Column()
    description: string;

    @Column()
    status: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
  
}